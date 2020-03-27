using System.Threading.Tasks;
using System.Collections.Generic;
using Schedular.API.Models;
using System.Linq;

namespace Schedular.API.Data
{
    public interface ITaskScheduleRepository
    {
      void Add<T>(T entity) where T: class;
      void Delete<T>(T entity) where T: class;

      //"task" returns type task object, executes asyncrhonous on a thread
      //IEnumerable loops over a collection of classes
      Task<bool> SaveAll();
      // get all tasks        
      Task<IEnumerable<TaskSchedule>> GetTasks();
      //get an individual task 
      Task<TaskSchedule> GetTask(int id);    
      //get users task
      Task<IList<TaskSchedule>> GetTaskSchedulesByStaffId(int id);      
    }
}