using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedular.API.Helpers;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public class ReportRepository : IReportRepository
    {
         private readonly DataContext _context;
        public ReportRepository(DataContext context)
        {
            _context = context;
        }

        //High priority tasks by time
        public async Task<PagedList<TaskSchedule>> GetHighPriorityTasks( 
            DateTime startDate, DateTime endDate, bool status, TaskParams taskParams)
        {
            DateTime endDateAdjust = endDate.AddDays(1);
            var query = _context.TaskSchedules
                .Where(t => t.Start >= startDate && t.End <= endDateAdjust)
                .Where(h =>h.highPriority == true)
                .Where(s => s.isClosed == status)
                .Include(c => c.customer)
                .Include(u => u.userCurrentAssigned)
                .AsNoTracking();

            //gets sent to the pagination methods to be paginated 
            return await PagedList<TaskSchedule>
                .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
        }

        //get number of closed tasks by user by time
        public userClosedTasks[] GetTasksClosedByUser(DateTime startDate, DateTime endDate)
        {

            //get users id 
            var usernamesId = _context.Users
                .Where(a => a.IsEnabled == true)
                .Select(u => u.Id).ToArray();

            //number of users for the userClosedTask array size
            int numberofUsers = _context.Users
                .Where(a => a.IsEnabled == true)
                .Select(u => u.Id).Count();

            userClosedTasks[] returnUserClosedTasks = new userClosedTasks[numberofUsers];
            // List<userClosedTasks> returnUserClosedTasks = new List<userClosedTasks>();

            int i = 0;
            foreach(var usernameId in usernamesId)
            {
                DateTime endDateAdjust = endDate.AddDays(1);
                var numberClosedTasksReturn = _context.TaskSchedules
                    .Where(t => t.Start >= startDate && t.End <= endDateAdjust)
                    .Where(s => s.isClosed == true)
                    .Where(u => u.userLastEditId == usernameId)
                    .Count();
                var usernameReturn = _context.Users
                    .Where(u => u.Id == usernameId)
                    .Select(u => u.UserName)
                    .ToList();

                returnUserClosedTasks[i] = new userClosedTasks(usernameReturn[0], numberClosedTasksReturn);
                i++;                  
            }
            
            return returnUserClosedTasks;
        }

        //get number of closed tasks by user 
        public userClosedTasks[] GetAllTasksClosedByUser()
        {

            //get users id 
            var usernamesId = _context.Users
                .Where(a => a.IsEnabled == true)
                .Select(u => u.Id).ToArray();

            //number of users for the userClosedTask array size
            int numberofUsers = _context.Users
                .Where(a => a.IsEnabled == true)
                .Select(u => u.Id).Count();

            userClosedTasks[] returnUserClosedTasks = new userClosedTasks[numberofUsers];
            // List<userClosedTasks> returnUserClosedTasks = new List<userClosedTasks>();

            int i = 0;
            foreach(var usernameId in usernamesId)
            {
                var numberClosedTasksReturn = _context.TaskSchedules
                    .Where(s => s.isClosed == true)
                    .Where(u => u.userLastEditId == usernameId)
                    .Count();
                var usernameReturn = _context.Users
                    .Where(u => u.Id == usernameId)
                    .Select(u => u.UserName)
                    .ToList();

                returnUserClosedTasks[i] = new userClosedTasks(usernameReturn[0], numberClosedTasksReturn);
                i++;                  
            }
            
            return returnUserClosedTasks;
        }



        //All High priority tasks 
        public async Task<PagedList<TaskSchedule>> GetAllHighPriorityTasks(bool status, TaskParams taskParams)
        {
            var query = _context.TaskSchedules
                .Where(h =>h.highPriority == true)
                .Where(s => s.isClosed == status)
                .Include(c => c.customer)
                .Include(u => u.userCurrentAssigned)
                .AsNoTracking();

            //gets sent to the pagination methods to be paginated 
            return await PagedList<TaskSchedule>
                .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
        }

        //Task customer by time
        public async Task<PagedList<TaskSchedule>> GetTaskByCustomerTime(int customerId, 
            DateTime startDate, DateTime endDate, TaskParams taskParams)
        {
            DateTime endDateAdjust = endDate.AddDays(1);
            var query = _context.TaskSchedules
                .Where(u => u.customerId == customerId)
                .Where(t => t.Start >= startDate && t.End <= endDateAdjust)
                .Include(c => c.customer)
                .Include(u => u.userCurrentAssigned)
                .AsNoTracking();

            //gets sent to the pagination methods to be paginated 
            return await PagedList<TaskSchedule>
                .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
        }

        //All Tasks by customer
        public async Task<PagedList<TaskSchedule>> GetAllTaskByCustomer(int customerId, TaskParams taskParams)
        {
            var query = _context.TaskSchedules
                .Where(u => u.customerId == customerId)
                .Include(c => c.customer)
                .Include(u => u.userCurrentAssigned)
                .AsNoTracking();

            //gets sent to the pagination methods to be paginated 
            return await PagedList<TaskSchedule>
                .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
        }

         //work out the number of hours worked
        public async Task<TimeSpan> GetHoursWorkedRepo(int id, DateTime startDate, DateTime endDate)
        {            
            DateTime endDateAdjust = endDate.AddDays(1);
            var taskSchedulesWorked = await _context.TaskSchedules
                .Where(u => u.userCurrentAssignedId == id)
                .Where(t => t.Start >= startDate && t.End <= endDateAdjust)
                .Include(u => u.userCurrentAssigned)
                .ToListAsync();

            // get hours worked            
            TimeSpan HoursInTask;
            TimeSpan HoursWorked = TimeSpan.Zero;
            int count = 0;           

            foreach(var task in taskSchedulesWorked)
            {
                if (taskSchedulesWorked[count].End.HasValue && taskSchedulesWorked[count].Start.HasValue)
                {
                    // allows nullable to be excluded using the .hasvalue and .value 
                    HoursInTask = taskSchedulesWorked[count].End.Value 
                        - taskSchedulesWorked[count].Start.Value;

                    HoursWorked = HoursWorked.Add(HoursInTask);
                    count++;
                }

            }
            return HoursWorked;            
        }

        //get the tasks between the hours worked
        public async Task<PagedList<TaskSchedule>> GetTasksWithinHoursWorkedRepo(int id, 
            DateTime startDate, DateTime endDate, TaskParams taskParams)
        {
            DateTime endDateAdjust = endDate.AddDays(1);
            var query = _context.TaskSchedules
                .Where(u => u.userCurrentAssignedId == id)
                .Where(t => t.Start >= startDate && t.End <= endDateAdjust)
                .Include(c => c.customer)
                .Include(u => u.userCurrentAssigned)
                .AsNoTracking();

            //gets sent to the pagination methods to be paginated 
            return await PagedList<TaskSchedule>
                .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
        }
    }
}