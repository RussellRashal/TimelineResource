using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Schedular.API.Data;
using Schedular.API.Models;

namespace Schedular.API.Controllers
{
    [Authorize]
    //[AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController] 

    public class CustomerController: ControllerBase
    {
        //initialise the taskschedule repository    
        private readonly ICustomerRepository _repo;

        //contructor to use private _repo
        public CustomerController(ICustomerRepository repo)
        {
            _repo = repo;
        }

        
        [HttpPost]
        public async Task<IActionResult> PostCustomer(Customer customer)
        {
            _repo.Add(customer);                              

            if(await _repo.SaveAll())
                return Ok();   
            return BadRequest("Failed to save Notes");  
        }

    }
}