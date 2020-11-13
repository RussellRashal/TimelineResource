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
    //[AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController] 

    public class CustomerController: ControllerBase
    {
        //initialise the taskschedule repository    
        private readonly ICustomerRepository _repo;
        private readonly IMapper _mapper;

        //contructor to use private _repo
        public CustomerController(ICustomerRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {         
            var customers = await _repo.GetCustomers();
            var customersReturn = _mapper.Map<IEnumerable<customerDto>>(customers);

            return Ok(customersReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {         
            var customer = await _repo.GetCustomer(id);            

            if(customer.Count != 0)
            {
                return Ok(customer);
            }
            return BadRequest();
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