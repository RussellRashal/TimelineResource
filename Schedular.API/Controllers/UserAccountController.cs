using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Schedular.API.Data;
using Schedular.API.Dtos;
using Schedular.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Schedular.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly IUserAccountRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public UserAccountController(IUserAccountRepository repo, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper; // for main photo on nav bar 
            _config = config;
            _repo = repo;
        }
        //get user account
        [HttpGet("id", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserAccountReturnDto>(user);

            return Ok(userToReturn);
        }

        
        //register a new user with the below API
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserAccountRegisterDto userAccountRegisterDto)
        {
            //convert username field to lower case
            userAccountRegisterDto.Username = userAccountRegisterDto.Username.ToLower();

            //does this username already exist, go to 'UserExist()' method which will return true
            //if the username exists in the database  
            if (await _repo.UserExist(userAccountRegisterDto.Username))
                return BadRequest("Username already exists");

            //mapping 'userAccountRegisterDto to the 'User' model
            var userToCreate = _mapper.Map<UserAccount>(userAccountRegisterDto);

            //go to the register method and create user object with its password. 
            //the password will be hashed
            var createdUser = await _repo.Register(userToCreate, userAccountRegisterDto.Password);

            //convert back from 'User' to DTo and assign it to object 'userToReturn' 
            var userToReturn = _mapper.Map<UserAccountReturnDto>(createdUser);

            //CreatedAtRoute will send the userToReturn object into the Api of 'getUser' in the same controller
            //it will send in the createduserid and useraccount 
            return CreatedAtRoute("GetUser", new {controller = "UserAccount", id = createdUser.Id},userToReturn);
            // return CreatedAtRoute(userToReturn);
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserAccountLoginDto userAccountLoginDto)
        {
            //can the user login with the username and password given
            var userFromRepo = await _repo.Login(userAccountLoginDto.Username.ToLower(), userAccountLoginDto.Password); //user has logged in, get all users photos and information
            //if user is unauthorised
            if (userFromRepo == null)
                return Unauthorized();

            //store token claim to allow token to be checked without going to the database
            var claims = new[]
            {
                //convert token to string
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                //store usename of the user
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            //get the value of the token
            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));
            //hashes the 'key' value
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            //expiry date for the token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            //this 'token' contains the jwt that will be returned to the client
            var token = tokenHandler.CreateToken(tokenDescriptor);

            //to return user.id so allow for front-end  to send back to the back-end
            var user = _mapper.Map<UserAccountReturnDto>(userFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                //to allow main photo to be updated on nav bar without needing multiple API requests
                //this will pass down the user information alongside the token, so not inside the token. 
                
                user.Id
            });
        }
    }
}