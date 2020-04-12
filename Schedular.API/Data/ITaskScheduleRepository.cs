using System.Threading.Tasks;
using System.Collections.Generic;
using Schedular.API.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Schedular.API.Data
{
    public interface ITaskScheduleRepository
    {
      void Add<T>(T entity) where T: class;
      TaskSchedule Update(int id, TaskSchedule taskSchedule);
      void Delete(int id);
  

      //"task" returns type task object, executes asyncrhonous on a thread
      //IEnumerable loops over a collection of classes
      Task<bool> SaveAll();
      // get all tasks        
      Task<IEnumerable<TaskSchedule>> GetTasks();
      //get an individual task 
      Task<TaskSchedule> GetTask(int id);    
      //get users task
      Task<IList<TaskSchedule>> GetTaskSchedulesByStaffId(int id);  
      Task<TimeSpan> GetTaskSchedulesOfHoursWorked(int id, DateTime startDate, DateTime endDate);      
    
    }
}