using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Schedular.API.Data;
using Schedular.API.Models;

namespace Schedular.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class staffController : ControllerBase
    {
        private readonly IStaffRepository _repo;
        // add DTO code here 
        //contructor to use private _repo
        public staffController(IStaffRepository repo)
        {
            _repo = repo;
            // add DTO code here 
        }

        [HttpGet]
        public async Task<IActionResult> GetStaff()
        {
            var staffs = await _repo.GetStaffs();

            // add DTO code here 

            return Ok(staffs);
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