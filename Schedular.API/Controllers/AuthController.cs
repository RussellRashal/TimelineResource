using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Schedular.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Schedular.API.Dtos;
using Schedular.API.Data;
using System.Linq;

namespace Schedular.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;


        public AuthController(IConfiguration config, IMapper mapper,
        UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _config = config;
        }
        [Authorize(Policy ="AdminAccess")]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //check if role name is valid
            if(userForRegisterDto.Role == "Standard" || userForRegisterDto.Role == "Admin")
            {
                //create the user account
                userForRegisterDto.Username = userForRegisterDto.FirstName + userForRegisterDto.LastName;
                var userToCreate = _mapper.Map<User>(userForRegisterDto);
                var result = await _userManager.CreateAsync(userToCreate,
                userForRegisterDto.Password);
                                
                //create the role
                var roleResult = await _userManager.AddToRoleAsync(userToCreate, userForRegisterDto.Role);

                if(result.Succeeded)
                {
                    return Ok("User Account " + userForRegisterDto.Username +  " has been created");

                } 
                else 
                {
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                return BadRequest("Incorrect role added");
            }          

        }

        [Authorize(Policy ="AdminAccess")]
        [HttpPut("adminPasswordReset")]
        public async Task<IActionResult> AdminResetPassword(PasswordReset passwordReset)
        {
            try
            {            
                var user = await _userManager.FindByNameAsync(passwordReset.Username);

                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, passwordReset.NewPassword);

                var result = await _userManager.UpdateAsync(user);
            
                if(result.Succeeded)
                {
                    return Ok();
                } 
                else 
                {
                    return BadRequest(result.Errors);
                }
            }
            catch(NullReferenceException)
            {
                return BadRequest();   
            }              
        }

        [Authorize]
        [HttpPut("standardPasswordReset")]
        public async Task<IActionResult> StandardResetPassword(PasswordReset passwordReset)
        {           
            // checks if user is in database                               
            var user = await _userManager.FindByNameAsync(User.FindFirst(ClaimTypes.Name).Value);
            //checks users password is correct
            var SignInWithCurrentPassword = await _signInManager.CheckPasswordSignInAsync(user, passwordReset.CurrentPassword, false);
            if (SignInWithCurrentPassword.Succeeded)
            {
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, passwordReset.NewPassword);
                var result = await _userManager.UpdateAsync(user);
                if(result.Succeeded)
                {
                    return Ok("password changed");
                } 
                else 
                {
                    return BadRequest(result.Errors);
                }      
            }
            return Unauthorized();                               
        }
        //edit user's roles
        [Authorize(Policy ="AdminAccess")]
        [HttpPut("editRoles")]
        public async Task<IActionResult> EditRoles(EditRoles editRoles)
        {
            try {
                var user = await _userManager.FindByNameAsync(editRoles.Username);

                if(editRoles.NewRole == "Standard" || editRoles.NewRole == "Admin")
                {                
                    // get the user first 

                    // find out what roles the user currently belongs to 
                    var userRoles = await _userManager.GetRolesAsync(user);

                    // remove user from old role
                    var removeUserRole = await _userManager.GetRolesAsync(user);
                    var userRoleRemoved = await _userManager.RemoveFromRolesAsync(user, removeUserRole);

                    // add user to the new roles
                    var result = await _userManager.AddToRoleAsync(user, editRoles.NewRole);
                    
                    if(!result.Succeeded)
                        return BadRequest("Failed to add to roles");           
                    if(!userRoleRemoved.Succeeded)
                        return BadRequest("failed to remove the roles");                
                    return Ok("User role has been changed");
                }                
                else
                {
                    return BadRequest("Incorrect role inserted");
                }         
            }
            catch(ArgumentNullException)
            {
                return BadRequest("Username does not exist");   
            }                     
        }
                
        //edit user's name
        [Authorize(Policy ="AdminAccess")]
        [HttpPut("editName")]
        public async Task<IActionResult> EditRoles(EditNameOfUser editNameOfUser)
        {
            try
            {
                // get the user first 
                var user = await _userManager.FindByNameAsync(editNameOfUser.CurrentUserName);

                //set the changes
                user.FirstName = editNameOfUser.NewFirstName;
                user.LastName = editNameOfUser.NewLastName;
                user.UserName = editNameOfUser.NewFirstName + editNameOfUser.NewLastName;

                //update the changes
                var result = await _userManager.UpdateAsync(user);
                
                if(result.Succeeded)
                {                    
                    return Ok("user has been updated");  
                    // return Ok(result.Succeeded); 
                }
                else 
                {
                    return BadRequest(result.Errors);                
                }         

            }
            catch(NullReferenceException)
            {
                return BadRequest("Username does not exist");   
            }
                
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            try 
            {
                // does the user exist in the database
                var user = await _userManager.FindByNameAsync(userForLoginDto.Username);
                // does the password match
                var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);
                // if username and password match
                if (result.Succeeded)
                {   
                    var userToReturn = _mapper.Map<UserForReturnDto>(user); 

                    return Ok(new
                    {
                        token = GenerateJwtToken(user).Result,
                        user = userToReturn,                 
                    });
                }
                return Unauthorized(); //if username and password are incorrect return unauthorised
            }
            catch (ArgumentNullException) 
            {
                return Unauthorized();
            }
            
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };
            // put the list of roles the user is in, within the token
            var roles = await _userManager.GetRolesAsync(user);

            foreach(var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}