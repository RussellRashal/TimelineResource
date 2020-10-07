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
        //edit user's roles
        [Authorize(Policy ="AdminAccess")]
        [HttpPut("editRoles/{userName}/{newRole}")]
        public async Task<IActionResult> EditRoles(string userName, string newRole)
        {
            if(newRole == "Standard" || newRole == "Admin")
            {
                // get the user first 
                var user = await _userManager.FindByNameAsync(userName);

                // find out what roles the user currently belongs to 
                var userRoles = await _userManager.GetRolesAsync(user);

                // remove user from old role
                var removeUserRole = await _userManager.GetRolesAsync(user);
                var userRoleRemoved = await _userManager.RemoveFromRolesAsync(user, removeUserRole);

                // add user to the new roles
                var result = await _userManager.AddToRoleAsync(user, newRole);
                
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
        //edit user's name
        [Authorize(Policy ="AdminAccess")]
        [HttpPut("editName/{currentUserName}/{newFirstName}/{newLastName}")]
        public async Task<IActionResult> EditRoles(string currentUserName, string newFirstName, string newLastName)
        {
                // get the user first 
                var user = await _userManager.FindByNameAsync(currentUserName);

                //set the changes
                user.FirstName = newFirstName;
                user.LastName = newLastName;
                user.UserName = newFirstName + newLastName;

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
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
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