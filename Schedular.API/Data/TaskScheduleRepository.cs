using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;
using Schedular.API.Data;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System;

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
            TaskScheduleDb.staffId = taskSchedule.staffId;

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
        public async Task<TaskSchedule> GetTask(int id)
        {
            //remember to add users with linq include
            var taskSchedule = await _context.TaskSchedules
                .Include(s => s.staffs)
                .FirstOrDefaultAsync(u => u.Id == id);

            return taskSchedule;
        }

        //get all data of taskSchedules
        public async Task<IEnumerable<TaskSchedule>> GetTasks()
        {
            var taskSchedule = await _context.TaskSchedules
                .Include(s => s.staffs)
                .ToListAsync();

            return taskSchedule;            
        }
        
    
        //get users tasks
        public async Task<IList<TaskSchedule>> GetTaskSchedulesByStaffId(int id)
        {
            var userTaskSchedule = await _context.TaskSchedules
            .Where(s => s.staffId == id)
            .ToListAsync();                                    

            return userTaskSchedule;            
        }

        //lets us know if changes have been saved on the database
        //if true is returned then changes have been made
        //if false is returned then no changes have been saved
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<TimeSpan> GetTaskSchedulesOfHoursWorked(int id, DateTime startDate, DateTime endDate)
        {
            DateTime endDateAdjust = endDate.AddDays(1);
            var taskSchedulesWorked = await _context.TaskSchedules
                .Where(s => s.staffId == id)
                .Where(t => t.Start >= startDate && t.End <= endDateAdjust)
                .ToListAsync();

            // get hours worked            
            TimeSpan HoursInTask;
            TimeSpan HoursWorked = TimeSpan.Zero;
            int count = 0;

            foreach(var task in taskSchedulesWorked) 
            {
                
                HoursInTask = taskSchedulesWorked[count].End - taskSchedulesWorked[count].Start;
        
                HoursWorked = HoursWorked.Add(HoursInTask);
                count++;
            }            

            return HoursWorked;
        }
    }
}