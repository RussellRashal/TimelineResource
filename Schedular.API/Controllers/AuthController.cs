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
using Schedular.API.Helpers;

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
        private readonly IUserRepository _repo; 

        public AuthController(IConfiguration config, IMapper mapper,
        UserManager<User> userManager, SignInManager<User> signInManager, IUserRepository repo)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _config = config;
            _repo = repo;
        }
        [Authorize(Policy ="AdminAccess")]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            if(_repo.GetNumberOfActiveUsers() < enviroment.maxUsers)
            {
                if(userForRegisterDto.Password.Length >= 8 && userForRegisterDto.Password.Any(char.IsUpper) 
                && userForRegisterDto.Password.Any(char.IsNumber))
                {
                    //check if role name is valid
                    if(userForRegisterDto.Role == "Standard" || userForRegisterDto.Role == "Admin")
                    {
                        //create the user account
                        userForRegisterDto.Username = userForRegisterDto.FirstName + userForRegisterDto.LastName;
                        userForRegisterDto.IsEnabled = true;

                        //get todays date to fill in enableAllowDate
                        DateTime thisDay = DateTime.Now;
                        string NowDate =  thisDay.ToString("dd/MM/yyyy");
                        var TodaysDate = Convert.ToDateTime(NowDate);
                        userForRegisterDto.EnableAllowDate = TodaysDate - TimeSpan.FromDays(1);

                        var userToCreate = _mapper.Map<User>(userForRegisterDto);
                        var result = await _userManager.CreateAsync(userToCreate,
                        userForRegisterDto.Password);
                                        
                        //create the role
                        var roleResult = await _userManager.AddToRoleAsync(userToCreate, userForRegisterDto.Role);

                        if(result.Succeeded)
                        {
                            return Ok("User Account " + userForRegisterDto.Username +  " has been created");
                        }                  
                        return BadRequest(result.Errors);
                    }
                    return BadRequest("Incorrect role added"); 
                }
                return BadRequest("Password does not meet minimum requirements. At least 8 characters long, 1 capital and a number.");           
            }
            return BadRequest("You have reached the maximum of " + enviroment.maxUsers + 
                " enabled users. Please speak to the service provider to upgrade your subscription");       
        }

        [Authorize(Policy ="AdminAccess")]
        [HttpPut("adminPasswordReset")]
        public async Task<IActionResult> AdminResetPassword(PasswordReset passwordReset)
        {
            if(passwordReset.NewPassword.Length >= 8 && passwordReset.NewPassword.Any(char.IsUpper) 
                && passwordReset.NewPassword.Any(char.IsNumber))
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
                    return BadRequest(result.Errors);
                    
                }
                catch(NullReferenceException)
                {
                    return BadRequest();   
                }
            } 
            return BadRequest("Password does not meet minimum requirements. At least 8 characters long, 1 capital and a number.");              
        }

        [Authorize]
        [HttpPut("standardPasswordReset")]
        public async Task<IActionResult> StandardResetPassword(PasswordReset passwordReset)
        {       
            if(passwordReset.NewPassword.Length >= 8 && passwordReset.NewPassword.Any(char.IsUpper) 
                && passwordReset.NewPassword.Any(char.IsNumber))
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
                        return Ok();
                    } 
                    return BadRequest(result.Errors);                        
                }
                return Unauthorized();                    
            }
            return BadRequest("Password does not meet minimum requirements. At least 8 characters long, 1 capital and a number.");                      
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
                    // find out what roles the user currently belongs to 
                    var userRoles = await _userManager.GetRolesAsync(user);
                    //can not have less than 2 admins
                    if(editRoles.NewRole == "Admin" || editRoles.NewRole == "Standard" && _repo.GetNumberOfAdmins() >= 2)
                    {
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
                    return BadRequest("You cannot have less than 2 admins");       
                }                
                return BadRequest("Incorrect role inserted");        
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
                return BadRequest(result.Errors);                        

            }
            catch(NullReferenceException)
            {
                return BadRequest("Username does not exist");   
            }
                
        }

        [Authorize(Policy ="AdminAccess")]
        [HttpPut("unlockAccount")]
        public async Task<IActionResult> unlockAccount(EditNameOfUser editUser)
        {
            try
            {
                // get the user first 
                var user = await _userManager.FindByNameAsync(editUser.CurrentUserName);

                //end lockout
                user.LockoutEnd = null;
                //update the changes
                var result = await _userManager.UpdateAsync(user);
                
                if(result.Succeeded)
                {                    
                    return Ok(editUser.CurrentUserName + " account has been unlocked");  
                    // return Ok(result.Succeeded); 
                }
                return BadRequest(result.Errors);                       

            }
            catch(NullReferenceException)
            {
                return BadRequest("Username does not exist");   
            }                
        }

        [Authorize(Policy ="AdminAccess")]
        [HttpPut("disableAccount")]
        public async Task<IActionResult> disableAccount(EditNameOfUser editUser)
        {
            try
            {
                // get the user first 
                var user = await _userManager.FindByNameAsync(editUser.CurrentUserName);

                //disable account
                user.IsEnabled = false;
                //get todays date
                DateTime thisDay = DateTime.Now.Date;
                string NowDate =  thisDay.ToString("g");
                var TodaysDate = Convert.ToDateTime(NowDate);
                //add todays date with 60 days 
                user.EnableAllowDate = TodaysDate + TimeSpan.FromDays(120);
                //update the changes
                var result = await _userManager.UpdateAsync(user);
                
                if(result.Succeeded)
                {                    
                    return Ok("User has been disabled");  
                }
                return BadRequest(result.Errors);                   

            }
            catch(NullReferenceException)
            {
                return BadRequest("Username does not exist");   
            }                
        }

        [Authorize(Policy ="AdminAccess")]
        [HttpPut("enableAccount")]
        public async Task<IActionResult> enableAccount(EditNameOfUser editUser)
        {
            try
            {
                //get todays date 
                DateTime thisDay = DateTime.Now;
                string NowDate =  thisDay.ToString("g");
                var TodaysDate = Convert.ToDateTime(NowDate);
                // get the user first 
                var user = await _userManager.FindByNameAsync(editUser.CurrentUserName);

                if(_repo.GetNumberOfActiveUsers() < enviroment.maxUsers)
                {
                    if(TodaysDate >= user.EnableAllowDate)
                    {
                        //enable account 
                        user.IsEnabled = true;
                        user.EnableAllowDate = TodaysDate;
        
                        //update the changes
                        var result = await _userManager.UpdateAsync(user);
                        
                        if(result.Succeeded)
                        {                    
                            return Ok("User has been enabled");  
                        } 
                        return BadRequest(result.Errors);                
                            
                    } 
                    string EnableAllowDateOnly =  user.EnableAllowDate.ToString("dd/MM/yyyy");    
                    return BadRequest("you will need to wait until " + EnableAllowDateOnly + " to enable this account");               
                }
                return BadRequest("You cannot enable this user as you have reached the maximum of " + enviroment.maxUsers + 
                " enabled users. Please speak to the service provider to upgrade your subscription");                    
            }
            catch(NullReferenceException)
            {
                return BadRequest("Username does not exist");   
            }                
        }

        [Authorize(Policy ="AdminAccess")]
        [HttpGet("allEnabledAccounts")]
        public async Task<IActionResult> allEnabledAccounts()
        {
            var users = await _repo.GetAllEnabledAccounts();
            var userToReturn = _mapper.Map<IList<UserForReturnDto>>(users); 

            //return users;
            return Ok(userToReturn);
        }

        [Authorize(Policy ="AdminAccess")]
        [HttpGet("allDisabledAccounts")]
        public async Task<IActionResult> allDisabledAccounts()
        {
            var users = await _repo.GetAllDisabledAccounts();
            var userToReturn = _mapper.Map<IList<UserForReturnDto>>(users); 

            //return users;
            return Ok(userToReturn);
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
                var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, true);
                // if username and password match
                
                if(!result.IsLockedOut)
                {
                    if(user.IsEnabled)
                    {
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
                    return Unauthorized("This account is disabled. Please get an administrator to unlock this account.");                               
                }                
                return Unauthorized("This account is locked out. Please try again in 10 minutes or get an " + 
                    "administrator to unlock your account.");              
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