using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Schedular.API.Data;
using Schedular.API.Dtos;
using Schedular.API.Models;

namespace Schedular.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController] 
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        //contructor to use private _repo
        public UserController(IUserRepository repo, IMapper mapper)
        {
             _mapper = mapper;
            _repo = repo;
        }

        [Authorize(Policy ="ManagerAccess")]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();            
            var usersReturn = _mapper.Map<IEnumerable<UserForReturnDto>>(users);

            return Ok(usersReturn);
            // return Unauthorized();
        }
    }
}