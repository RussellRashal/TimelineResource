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
using Schedular.API.Helpers;
using System.IO;
using Microsoft.AspNetCore.Hosting;

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
        private IWebHostEnvironment _env;

        // add DTO code here 
        //contructor to use private _repo
        public TaskScheduleController(ITaskScheduleRepository repo, IMapper mapper,
        IWebHostEnvironment env)
        {
            _mapper = mapper;
            _repo = repo;
            _env = env;
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

            if(taskschedule.Count != 0)
            {
                return Ok(taskschedule);
            }
            return BadRequest();

        }
        //used for ViewTasksComponent 
        [HttpGet("byUser/{userId}")]
        //public async Task<IActionResult> GetTaskSchedule(int staffId)
        public async Task<IActionResult> GetTaskSchedulesByUser(int userId, [FromQuery]TaskParams taskParams)
        {
            var taskScheduled = await _repo.GetTask(2);
      
            int tokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            if (userId == tokenUserId || User.IsInRole("Admin")) {
                var taskSchedule = await _repo.GetTaskSchedulesByUser(userId, taskParams);
                var taskReturn = _mapper.Map<IEnumerable<getTaskScheduleDto>>(taskSchedule);

                //add the pagination information in the response header
                Response.AddPagination(taskSchedule.CurrentPage, taskSchedule.PageSize,
                    taskSchedule.TotalCount, taskSchedule.TotalPages);
                return Ok(taskReturn);
            }
            return Unauthorized();                   
        }

        [HttpGet("byUserCalendar/{userId}")]
        //public async Task<IActionResult> GetTaskSchedule(int staffId)
        public async Task<IActionResult> GetTaskSchedulesByUser(int userId)
        {
            var taskScheduled = await _repo.GetTask(2);
      
            int tokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            if (userId == tokenUserId || User.IsInRole("Admin")) {
                var taskSchedule = await _repo.GetTaskSchedulesByUserCalendar(userId);
                var taskReturn = _mapper.Map<IEnumerable<getTaskScheduleDto>>(taskSchedule);

                return Ok(taskReturn);
            }
            return Unauthorized();                   
        }
        //get either open or closed tasks
        [HttpGet("byUserOpenCloseTasks/{userId}/{isClosed}")]
        public async Task<IActionResult> GetOpenCloseTasksByUser(int userId, bool isClosed, [FromQuery]TaskParams taskParams)
        {
            int tokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            if (userId == tokenUserId || User.IsInRole("Admin")) {
                var taskSchedule = await _repo.GetOpenCloseTasksByUser(userId, isClosed, taskParams);
                var taskReturn = _mapper.Map<IEnumerable<getTaskScheduleDto>>(taskSchedule);

                //add the pagination information in the response header
                Response.AddPagination(taskSchedule.CurrentPage, taskSchedule.PageSize,
                    taskSchedule.TotalCount, taskSchedule.TotalPages);

                return Ok(taskReturn); 
            }    
            return Unauthorized();

        }

        //get either high priority open or closed tasks
        [HttpGet("byUserHighOpenCloseTasks/{userId}/{isClosed}/{HighPriority}")]
        public async Task<IActionResult> GetHighPriorityOpenCloseTasksByUser(int userId, bool isClosed, bool HighPriority, [FromQuery]TaskParams taskParams)
        {
            int tokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            if (userId == tokenUserId || User.IsInRole("Admin")) {
                var taskSchedule = await _repo.GetHighPriorityOpenCloseTasksByUser(userId, isClosed, HighPriority, taskParams);
                var taskReturn = _mapper.Map<IEnumerable<getTaskScheduleDto>>(taskSchedule);

                //add the pagination information in the response header
                Response.AddPagination(taskSchedule.CurrentPage, taskSchedule.PageSize,
                    taskSchedule.TotalCount, taskSchedule.TotalPages);

                return Ok(taskReturn); 
            }    
            return Unauthorized();  
        }

      

        [HttpPost("task")]        
        public async Task<IActionResult> PostSchedule([FromBody] TaskSchedule taskSchedule)
        {
            int tokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            DateTime thisDay = DateTime.Now;
            string NowDate =  thisDay.ToString("g");

            taskSchedule.userLastEditId = tokenUserId;
            taskSchedule.taskCreatedDate = Convert.ToDateTime(NowDate);
            taskSchedule.userLastEditDate = Convert.ToDateTime(NowDate);

            if(taskSchedule.Notes != null) {
                taskSchedule.Notes[0].DateCreated = Convert.ToDateTime(NowDate);
                taskSchedule.Notes[0].UserId = tokenUserId;
            }     
            if(taskSchedule.Start > taskSchedule.End) {
                return BadRequest("start time is not less than end time");  
            }
            else if (taskSchedule.userCurrentAssignedId == tokenUserId || User.IsInRole("Admin")) {   
                var taskScheduleRepo = await _repo.Add(taskSchedule); 
                var taskReturn = _mapper.Map<getTaskScheduleIdDto>(taskScheduleRepo); 
                return Ok(taskReturn);       
            }
            else {     
                return Unauthorized();
            }
          
        }

        [HttpPut("{id}")]
        public ActionResult<TaskSchedule> PutSchedule(int id, [FromBody] TaskSchedule taskSchedule)
        {
            int tokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            taskSchedule.userLastEditId = tokenUserId; 

            DateTime thisDay = DateTime.Now;
            string NowDate =  thisDay.ToString("g");
            taskSchedule.userLastEditDate = Convert.ToDateTime(NowDate);

            var updateTask = PutScheduleM(id, taskSchedule);
            return updateTask;   
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskSchedule(int id)
        {
            //get task id to see userID, check if user ID matches with the ID that is asking it to be deleted
            var taskSchedule = await _repo.GetTask(id);
            //convert using dto to view userID. needs converting from Task<IEnumerable<TaskSchedule>> to TaskSchedule
            int tokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);


            if (taskSchedule[0].userCurrentAssignedId == tokenUserId || User.IsInRole("Admin")) {
                _repo.Delete(id);
                 return Ok();
            }
            return BadRequest("Unauthorised");
                     
        }

        //updating new tasks
        public ActionResult<TaskSchedule> PutScheduleM(int id, [FromBody] TaskSchedule taskSchedule) 
        {
            if(taskSchedule.Start < taskSchedule.End || taskSchedule.Start == null && taskSchedule.End == null) {
                TaskSchedule taskSchedulePut = _repo.Update(id, taskSchedule);
                return taskSchedulePut;    
            }
            return BadRequest("start time is not less than end time");                 
        }   
    }    
}