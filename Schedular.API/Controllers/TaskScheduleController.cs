using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Schedular.API.Data;
using Schedular.API.Models;
using Schedular.API.Dtos;
using AutoMapper;
using System;
using System.Security.Claims;

namespace Schedular.API.Controllers
{
    //[Authorize]
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController] 
    public class TaskScheduleController : ControllerBase
    {   
        //initialise the taskschedule repository    
        private readonly ITaskScheduleRepository _repo;
         private readonly IMapper _mapper;


        // add DTO code here 
        //contructor to use private _repo
        public TaskScheduleController(ITaskScheduleRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
            // add DTO code here 
        }

        //[Authorize(Policy ="ManagerAccess")]
        [HttpGet]
        public async Task<IActionResult> GetTaskSchedules()
        {
            var taskschedules = await _repo.GetTasks();

            // add DTO code here 

            return Ok(taskschedules);
        }

        [HttpGet("byStaff/{staffId}")]
        //public async Task<IActionResult> GetTaskSchedule(int staffId)
        public async Task<IActionResult> GetTaskSchedule(int staffId)
        {
            // //get userId from the jwt token
            // var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 


            // // is the user allowed access to the staff table
            // bool isUserAllowedAccessToStaff = _repo.isUserStaffAllowed(staffId, UserId);
            // // if user is in admin or manager role allow access 
            // if(User.IsInRole("Admin") || User.IsInRole("Manager"))
            // {
            //     isUserAllowedAccessToStaff = true;
            // }

            // // if they are return the tasks for that staff member
            // if(isUserAllowedAccessToStaff == true)
            // {
            //     var taskSchedule = await _repo.GetTask(staffId);
            //     return Ok(taskSchedule);
            // }
            // return Unauthorized();



            var taskSchedule = await _repo.GetTask(staffId);
            var taskReturn = _mapper.Map<IEnumerable<getTaskScheduleDto>>(taskSchedule);

            return Ok(taskReturn);
            
        }

        //hours worked calculation
        //[Authorize(Policy ="ManagerAccess")]
        [HttpGet("hoursWorked/{id}/{startDate}/{endDate}")]
        public async Task<IActionResult> GetHoursWorked(int id, DateTime startDate, DateTime endDate)
        {
            var HoursWorked = await _repo.GetHoursWorkedRepo(id, startDate, endDate); 
            
            return Ok(HoursWorked);
            
        }
        //get the tasks worked in the hours selected
        //[Authorize(Policy ="ManagerAccess")]
        [HttpGet("tasksWithinHours/{id}/{startDate}/{endDate}")]
        public async Task<IActionResult> GetTasksWithinHoursWorked(int id, DateTime startDate, DateTime endDate)
        {
            var tasksWorkedWithinHours = await _repo.GetTasksWithinHoursWorkedRepo(id, startDate, endDate);            
            
            return Ok(tasksWorkedWithinHours);            
        }
        

        [HttpPost]        
        public async Task<IActionResult> PostSchedule(TaskSchedule taskSchedule)
        {
            if(taskSchedule.Start < taskSchedule.End)
            {
                _repo.Add(taskSchedule);  
            }
            else 
            {
                return BadRequest("start time is not less than end time");  
            }             

            //save to the database
            if(await _repo.SaveAll())
                return Ok();   
            return BadRequest("Failed to save Schedule");   
        }
        [HttpPut("{id}")]
        public ActionResult<TaskSchedule> PutSchedule(int id, [FromBody] TaskSchedule taskSchedule)
        {
            if(taskSchedule.Start < taskSchedule.End)
            {
                TaskSchedule taskSchedulePut = _repo.Update(id, taskSchedule);
                return taskSchedulePut;    
            }
            else 
            {
                return BadRequest("start time is not less than end time");  
            }        

        }
        [HttpDelete("{id}")]
        public void DeleteTaskSchedule(int id)
        {
            _repo.Delete(id);
        }
    }    
}