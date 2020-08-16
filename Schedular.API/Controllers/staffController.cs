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
    //[Authorize]
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController] 
    public class staffController : ControllerBase
    {
        private readonly IStaffRepository _repo;
        private readonly IMapper _mapper;

        //contructor to use private _repo
        public staffController(IStaffRepository repo, IMapper mapper)
        {
             _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetStaff()
        {
            var staffs = await _repo.GetStaffs();            
            var staffReturn = _mapper.Map<IEnumerable<staffDto>>(staffs);

            return Ok(staffReturn);
        }
        [HttpPost]
        public async Task<IActionResult> PostStaff(Staff staff)
        {
             _repo.Add(staff);     
             //save the database
            if(await _repo.SaveAll())
                return Ok();   
            return BadRequest("Failed to add staff");   
        }
    }
}