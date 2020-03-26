using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Schedular.API.Data;
using Schedular.API.Models;

namespace Schedular.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class TaskScheduleController : ControllerBase
    {   
        //initialise the taskschedule repository    
        private readonly ITaskScheduleRepository _repo;

        // add DTO code here 
        //contructor to use private _repo
        public TaskScheduleController(ITaskScheduleRepository repo)
        {
            _repo = repo;
            // add DTO code here 
        }

        [HttpGet]
        public async Task<IActionResult> GetTaskSchedule()
        {
            var taskschedule = await _repo.GetTasks();

            // add DTO code here 

            return Ok(taskschedule);
        }
        [HttpPost]
        public async Task<IActionResult> PostSchedule(TaskSchedule taskSchedule)
        {
             _repo.Add(taskSchedule);     
             //save the database
            if(await _repo.SaveAll())
                return Ok();   
            return BadRequest("Failed to like user");   
        }
    }    
}