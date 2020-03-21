using System.Threading.Tasks;
using System.Collections.Generic;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public interface ITaskScheduleRepository
    {
      void Add<T>(T entity) where T: class;
      void Delete<T>(T entity) where T: class;
      Task<bool> SaveAll();
      // get all tasks        
      Task<IEnumerable<TaskSchedule>> GetTasks();
      //get an individual task 
      Task<TaskSchedule> GetTask(int id);      
    }
}