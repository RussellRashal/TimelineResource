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
            else
            {
                return BadRequest();
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
                return Unauthorized();
            }  
            
        }
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
            else {     
                return Unauthorized();
            }             
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
            else {     
                return Unauthorized();
            }  
        }
        //get the tasks worked in the hours selected
        [HttpGet("tasksWithinHours/{userId}/{startDate}/{endDate}")]
        public async Task<IActionResult> GetTasksWithinHoursWorked(int userId, DateTime startDate, DateTime endDate, [FromQuery]TaskParams taskParams)
        {
            int tokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            if (userId == tokenUserId || User.IsInRole("Admin")) {
                var tasksWorkedWithinHours = await _repo.GetTasksWithinHoursWorkedRepo(userId, startDate, endDate, taskParams);
                
                 //add the pagination information in the response header
                Response.AddPagination(tasksWorkedWithinHours.CurrentPage, tasksWorkedWithinHours.PageSize,
                    tasksWorkedWithinHours.TotalCount, tasksWorkedWithinHours.TotalPages);  

                return Ok(tasksWorkedWithinHours);      
            }
            else {     
                return Unauthorized();
            }         
        }
        [HttpPost("test")]  
        public IActionResult testTask(IEnumerable<IFormFile> files)
        {
            string Ddrive = "D:/fileUpload";
            int i = 0;
            foreach(var file in files)
            {
                string extention = Path.GetExtension(file.FileName).ToLower();
                if(extention == ".docx" || extention == ".pdf" || extention == ".jpg" || extention == ".png" 
                    || extention == ".xls" || extention == ".xlsx" || extention == ".ppt" || extention == ".pttx" 
                    || extention == ".txt" || extention == ".avi" || extention == ".mp4" || extention == ".mp3")
                {
                    // check i has not already been taken, if it has increment to one again
                    using(var fileStream = new FileStream(Path.Combine(Ddrive 
                    + "/companyOne", "file" + i + extention), FileMode.Create, FileAccess.Write))
                    {
                        file.CopyTo(fileStream);
                    }

                }
                else
                {
                    return BadRequest();
                }                
                i ++;
            }
            return Ok();      
        }

        [HttpPost("task")]        
        public async Task<IActionResult> PostSchedule([FromBody] TaskSchedule taskSchedule, IFormFile file)
        {
            int tokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
 

            DateTime thisDay = DateTime.Now;
            string NowDate =  thisDay.ToString("g");

            taskSchedule.userLastEditId = tokenUserId;

            if(taskSchedule.Notes != null) {
                taskSchedule.Notes[0].DateCreated = Convert.ToDateTime(NowDate);
                taskSchedule.Notes[0].UserId = tokenUserId;
            }
       
            
            if(taskSchedule.Start > taskSchedule.End) {
                return BadRequest("start time is not less than end time");  
            }
            else if (taskSchedule.userCurrentAssignedId == tokenUserId || User.IsInRole("Admin")) {   
                _repo.Add(taskSchedule);                              
            }
            else {     
                return Unauthorized();
            }

            if(await _repo.SaveAll())
                return Ok();   
            return BadRequest("Failed to save Schedule");            
        }

        [HttpPut("{id}")]
        public ActionResult<TaskSchedule> PutSchedule(int id, [FromBody] TaskSchedule taskSchedule)
        {
            int tokenUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            taskSchedule.userLastEditId = tokenUserId; 

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
            if(taskSchedule.Start < taskSchedule.End || taskSchedule.Start == null && taskSchedule.End == null) {
                TaskSchedule taskSchedulePut = _repo.Update(id, taskSchedule);
                return taskSchedulePut;    
            }
            else {
                return BadRequest("start time is not less than end time");  
            }      
        }   
    }    
}