using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;
using Schedular.API.Data;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using Schedular.API.Helpers;

namespace Schedular.API.Data
{
    public class TaskScheduleRepository : ITaskScheduleRepository
    {
        //access to the database
        private readonly DataContext _context;
        public TaskScheduleRepository(DataContext context)
        {
            _context = context;
        }

        //add new data to the database
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        
        // update database
        public TaskSchedule Update(int Id, TaskSchedule taskSchedule) 
        {
            var TaskScheduleDb =  _context.TaskSchedules.SingleOrDefault(s => s.Id == Id);

            TaskScheduleDb.Title = taskSchedule.Title;
            TaskScheduleDb.Start = taskSchedule.Start;
            TaskScheduleDb.End = taskSchedule.End;
            TaskScheduleDb.userCurrentAssignedId = taskSchedule.userCurrentAssignedId;
            TaskScheduleDb.userLastEditId = taskSchedule.userLastEditId;
            TaskScheduleDb.highPriority = taskSchedule.highPriority;
            TaskScheduleDb.isClosed = taskSchedule.isClosed;
            TaskScheduleDb.hasTimeLimit = taskSchedule.hasTimeLimit;
            TaskScheduleDb.Attachments = taskSchedule.Attachments;

            _context.SaveChanges();

            return TaskScheduleDb;
        }    

        // Delete data

        public void Delete(int id)
        {
            _context.TaskSchedules.Remove(_context.TaskSchedules
                .FirstOrDefault(t => t.Id == id));
            _context.SaveChanges();        
        }

        //get individual taskschedules data
        public async Task<IList<TaskSchedule>> GetTask(int id)
        {    
             var taskSchedule = await _context.TaskSchedules
                .Where(u => u.Id == id)
                .Include(ts => ts.Notes)
                .Include(ts => ts.Attachments)
                .ToListAsync();
                
            return taskSchedule;  
        }  
     

        //get all data of taskSchedules
        public async Task<IEnumerable<TaskSchedule>> GetTasks()
        {
            var taskSchedule = await _context.TaskSchedules
                .Include(ts => ts.Notes)
                .ToListAsync();             
           
           return taskSchedule;
        }
        
    
        //get users tasks
        public async Task<PagedList<TaskSchedule>> GetOpenCloseTasksByUser(int userId, bool isClosed, TaskParams taskParams)
        {
            if(isClosed == true) 
            {
                var query = _context.TaskSchedules
                    .Where(u => u.userCurrentAssignedId == userId)
                    .Where(c =>c.isClosed == true)
                    .AsNoTracking();

                //gets sent to the pagination methods to be paginated 
                return await PagedList<TaskSchedule>
                    .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
            }
            else 
            {
                var query = _context.TaskSchedules
                    .Where(u => u.userCurrentAssignedId == userId)
                    .Where(c =>c.isClosed == false) 
                    .AsNoTracking();
                
                //gets sent to the pagination methods to be paginated 
                return await PagedList<TaskSchedule>
                    .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
            }                             
        }

        
        //get users tasks
        public async Task<PagedList<TaskSchedule>> GetHighPriorityOpenCloseTasksByUser(int userId, bool isClosed, bool HighPriority, TaskParams taskParams)
        {
            if(isClosed == false && HighPriority == true) //open high priority
            {
                var query = _context.TaskSchedules
                    .Where(u => u.userCurrentAssignedId == userId)
                    .Where(c => c.isClosed == false)
                    .Where(h => h.highPriority == true)
                    .AsNoTracking();

                //gets sent to the pagination methods to be paginated 
                return await PagedList<TaskSchedule>
                    .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
            }
            else if(isClosed == true && HighPriority == true) //closed high priority
            {
                var query = _context.TaskSchedules
                    .Where(u => u.userCurrentAssignedId == userId)
                    .Where(c =>c.isClosed == true)
                    .Where(h => h.highPriority == true) 
                    .AsNoTracking();
                
                //gets sent to the pagination methods to be paginated 
                return await PagedList<TaskSchedule>
                    .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
            } 
            else if(isClosed == false && HighPriority == false) //open normal priority
            {
                var query = _context.TaskSchedules
                    .Where(u => u.userCurrentAssignedId == userId)
                    .Where(c =>c.isClosed == false)
                    .Where(h => h.highPriority == false) 
                    .AsNoTracking();
                
                //gets sent to the pagination methods to be paginated 
                return await PagedList<TaskSchedule>
                    .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
            } 
            else // closed normal priority 
            {
               var query = _context.TaskSchedules
                    .Where(u => u.userCurrentAssignedId == userId)
                    .Where(c =>c.isClosed == true)
                    .Where(h => h.highPriority == false) 
                    .AsNoTracking();
                
                //gets sent to the pagination methods to be paginated 
                return await PagedList<TaskSchedule>
                    .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
            }                              
        }

        
        //get users with notes test 
        public async Task<PagedList<TaskSchedule>> GetTaskSchedulesByUser(int UserCurrentAssignedId, TaskParams taskParams)
        {
               var query = _context.TaskSchedules
                    .Include(ts => ts.Notes)
                    .Where(u => u.userCurrentAssignedId == UserCurrentAssignedId)
                    .AsNoTracking();

                //gets sent to the pagination methods to be paginated 
                return await PagedList<TaskSchedule>
                    .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);         
        }

        //lets us know if changes have been saved on the database
        //if true is returned then changes have been made
        //if false is returned then no changes have been saved
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        //work out the number of hours worked
        public async Task<TimeSpan> GetHoursWorkedRepo(int id, DateTime startDate, DateTime endDate)
        {            
            DateTime endDateAdjust = endDate.AddDays(1);
            var taskSchedulesWorked = await _context.TaskSchedules
                .Where(u => u.userCurrentAssignedId == id)
                .Where(t => t.Start >= startDate && t.End <= endDateAdjust)
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
                .AsNoTracking();

            //gets sent to the pagination methods to be paginated 
            return await PagedList<TaskSchedule>
                .CreateAsync(query, taskParams.Pagenumber, taskParams.PageSize);
        }
        public Task<IEnumerable<TaskSchedule>> GetOpenCloseTasksByUser(int userId)
        {
            throw new NotImplementedException();
        }
    }
}