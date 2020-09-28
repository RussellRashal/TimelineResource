using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Schedular.API.Data;
using Schedular.API.Models;
using Schedular.API.Dtos;
using AutoMapper;
using System;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;

namespace Schedular.API.Controllers
{
    [Authorize]
    //[AllowAnonymous]
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

        [Authorize(Policy ="AdminAccess")]
        [HttpGet]
        public async Task<IActionResult> GetTaskSchedules()
        {         
            var taskschedules = await _repo.GetTasks();
            return Ok(taskschedules);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {         
            var taskschedule = await _repo.GetTask(id);
            return Ok(taskschedule);
        }

        [HttpGet("byUser/{UserId}")]
        //public async Task<IActionResult> GetTaskSchedule(int staffId)
        public async Task<IActionResult> GetTaskSchedulesByUser(int UserId)
        {
            var taskScheduled = await _repo.GetTask(2);
      
            if (UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                var taskSchedule = await _repo.GetTaskSchedulesByUser(UserId);
                var taskReturn = _mapper.Map<IEnumerable<getTaskScheduleDto>>(taskSchedule);
                return Ok(taskReturn);
            }
            else if (User.IsInRole("Admin")) {
                var taskSchedule = await _repo.GetTaskSchedulesByUser(UserId);
                var taskReturn = _mapper.Map<IEnumerable<getTaskScheduleDto>>(taskSchedule);
                return Ok(taskReturn);
            }
            else {     
                return BadRequest("Unauthorised"); 
            }             
        }

        //hours worked calculation
        //[Authorize(Policy ="AdminAccess")]
        [HttpGet("hoursWorked/{id}/{startDate}/{endDate}")]
        public async Task<IActionResult> GetHoursWorked(int id, DateTime startDate, DateTime endDate)
        {            
            if (id == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return await GetHoursWorkedM(id, startDate, endDate);     
            }
            else if (User.IsInRole("Admin")) {
                return await GetHoursWorkedM(id, startDate, endDate);
            }
            else {     
                return BadRequest("Unauthorised"); 
            }  
            
        }
        //get the tasks worked in the hours selected
        [HttpGet("tasksWithinHours/{id}/{startDate}/{endDate}")]
        public async Task<IActionResult> GetTasksWithinHoursWorked(int id, DateTime startDate, DateTime endDate)
        {
            //var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            if (id == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                var tasksWorkedWithinHours = await _repo.GetTasksWithinHoursWorkedRepo(id, startDate, endDate);          
                return Ok(tasksWorkedWithinHours);      
            }
            else if (User.IsInRole("Admin")) {
                var tasksWorkedWithinHours = await _repo.GetTasksWithinHoursWorkedRepo(id, startDate, endDate);          
                return Ok(tasksWorkedWithinHours);  
            }
            else {     
                return BadRequest("Unauthorised"); 
            }         
        }
        
        [HttpPost]        
        public async Task<IActionResult> PostSchedule(TaskSchedule taskSchedule)
        {
            // Note sendNote;
            // sendNote.NotesInfo = taskSchedule.Notes[0].NotesInfo;
            // sendNote.UserId = taskSchedule.userId;
            int TokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            DateTime thisDay = DateTime.Now;
            string NowDate =  thisDay.ToString("g");
            taskSchedule.Notes[0].DateCreated = Convert.ToDateTime(NowDate);
            taskSchedule.Notes[0].UserId = TokenUserId;
            taskSchedule.userLastEditId = TokenUserId;        
            
            if(taskSchedule.Start > taskSchedule.End) {
                return BadRequest("start time is not less than end time");  
            }
            else if (taskSchedule.userCurrentAssignedId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {  
                _repo.Add(taskSchedule);                       
            }
            else if (User.IsInRole("Admin")) {
                _repo.Add(taskSchedule);   
            }
            else {     
                return BadRequest("Unauthorised"); 
            }

            if(await _repo.SaveAll())
                return Ok();   
            return BadRequest("Failed to save Schedule");            
        }

        [HttpPut("{id}")]
        public ActionResult<TaskSchedule> PutSchedule(int id, [FromBody] TaskSchedule taskSchedule)
        {
            int TokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            taskSchedule.userLastEditId = TokenUserId; 

            var updateTask = PutScheduleM(id, taskSchedule);
            return updateTask;  

            // if (taskSchedule.userCurrentAssignedId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {

            //     var updateTask = PutScheduleM(id, taskSchedule);
            //     return updateTask; 
            // }
            // else if (User.IsInRole("Admin")) {
            //     var updateTask = PutScheduleM(id, taskSchedule); 
            //     return updateTask;
            // }
            // else {     
            //     return BadRequest("Unauthorised"); 
            // }     

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskSchedule(int id)
        {
            //get task id to see userID, check if user ID matches with the ID that is asking it to be deleted
            var taskSchedule = await _repo.GetTask(id);
            //convert using dto to view userID. needs converting from Task<IEnumerable<TaskSchedule>> to TaskSchedule
            //var userIdOnTaskDto = _mapper.Map<getTaskScheduleDto>(taskSchedule); 
            var userIDVlaue = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (taskSchedule[0].userCurrentAssignedId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                _repo.Delete(id);
                 return Ok();
            }
            else if (User.IsInRole("Admin")) {
                _repo.Delete(id);
                 return Ok();
            } 
            else {
                return BadRequest("Unauthorised");
            }           
        }





        //tasks worked within hours method 
        public async Task<IActionResult> GetHoursWorkedM(int id, DateTime startDate, DateTime endDate)
        {
            var HoursWorked = await _repo.GetHoursWorkedRepo(id, startDate, endDate); 
            var minutes = HoursWorked.ToString(@"mm");

            var hour = Int32.Parse(HoursWorked.ToString(@"hh"));
            var day = Int32.Parse(HoursWorked.ToString(@"dd")) * 24;
            var fullHours = (hour + day).ToString();           

            string[] fullHoursworked = {fullHours, minutes};


            return Ok(fullHoursworked);
        }

        //updating new tasks
        public ActionResult<TaskSchedule> PutScheduleM(int id, [FromBody] TaskSchedule taskSchedule) 
        {
            if(taskSchedule.Start < taskSchedule.End) {
                TaskSchedule taskSchedulePut = _repo.Update(id, taskSchedule);
                return taskSchedulePut;    
            }
            else {
                return BadRequest("start time is not less than end time");  
            }      
        }   
 
    }    
}