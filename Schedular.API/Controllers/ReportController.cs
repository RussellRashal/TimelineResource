using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Schedular.API.Data;
using Schedular.API.Helpers;
using Schedular.API.Models;

namespace Schedular.API.Controllers
{
    [Authorize(Policy ="AdminAccess")]
    [Route("api/[controller]")]
    [ApiController] 
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _repo;
        //private readonly IMapper _mapper;

        public ReportController(IReportRepository repo)
        {
            _repo = repo;
        }

        //number of closed tasks by user by time
        [HttpGet("TasksClosedByUser/{startDate}/{endDate}")]
        public userClosedTasks[] GetTasksClosedByUser(DateTime startDate, DateTime endDate)
        {            
            var TasksClosedByUser = _repo.GetTasksClosedByUser(startDate, endDate);

            return TasksClosedByUser;      
        }

        //All number of closed tasks 
        [HttpGet("TasksClosedByUser")]
        public userClosedTasks[] GetAllTasksClosedByUser()
        {            
            var TasksClosedByUser = _repo.GetAllTasksClosedByUser();

            return TasksClosedByUser;      
        }

        //high priority tasks by time
        [HttpGet("HighPriorityTasks/{startDate}/{endDate}/{status}")]
        public async Task<IActionResult> GetHighPriorityTasks(DateTime startDate, DateTime endDate, 
            bool status, [FromQuery]TaskParams taskParams)
        {            
            var HighPriorityTasks = await _repo.GetHighPriorityTasks(startDate, endDate, status, taskParams);

            //add the pagination information in the response header
            Response.AddPagination(HighPriorityTasks.CurrentPage, HighPriorityTasks.PageSize,
                HighPriorityTasks.TotalCount, HighPriorityTasks.TotalPages);  

            return Ok(HighPriorityTasks);      
        }

        //All high priority tasks 
        [HttpGet("HighPriorityTasks/{status}")]
        public async Task<IActionResult> GetAllHighPriorityTasks(bool status, [FromQuery]TaskParams taskParams)
        {            
            var HighPriorityTasks = await _repo.GetAllHighPriorityTasks(status, taskParams);

            //add the pagination information in the response header
            Response.AddPagination(HighPriorityTasks.CurrentPage, HighPriorityTasks.PageSize,
                HighPriorityTasks.TotalCount, HighPriorityTasks.TotalPages);  

            return Ok(HighPriorityTasks);      
        }

        //Task customer by time
        [HttpGet("TaskByCustomerTime/{customerId}/{startDate}/{endDate}")]
        public async Task<IActionResult> GetTaskByCustomerTime(int customerId, DateTime startDate, DateTime endDate, [FromQuery]TaskParams taskParams)
        {            
            var customerTasks = await _repo.GetTaskByCustomerTime(customerId, startDate, endDate, taskParams);

            //add the pagination information in the response header
            Response.AddPagination(customerTasks.CurrentPage, customerTasks.PageSize,
                customerTasks.TotalCount, customerTasks.TotalPages);  

            return Ok(customerTasks);      
        }

        //Task customer by without time
        [HttpGet("TaskByCustomerAll/{customerId}")]
        public async Task<IActionResult> GetTaskByCustomerAll(int customerId, [FromQuery]TaskParams taskParams)
        {            
            var customerTasks = await _repo.GetAllTaskByCustomer(customerId, taskParams);

            //add the pagination information in the response header
            Response.AddPagination(customerTasks.CurrentPage, customerTasks.PageSize,
                customerTasks.TotalCount, customerTasks.TotalPages);  

            return Ok(customerTasks);      
        }
        
        [Authorize]
        //hours worked calculation
        [HttpGet("hoursWorked/{id}/{startDate}/{endDate}")]
        public async Task<IActionResult> GetHoursWorked(int id, DateTime startDate, DateTime endDate)
        {            
            if (id == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return await GetHoursWorkedM(id, startDate, endDate);     
            }
            else if (User.IsInRole("Admin")) {
                return await GetHoursWorkedM(id, startDate, endDate);
            }
            return Unauthorized();
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
            return Unauthorized();       
        }   
    }
}