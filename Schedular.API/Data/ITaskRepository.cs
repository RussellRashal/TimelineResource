using System.Threading.Tasks;
using System.Collections.Generic;

namespace Schedular.API.Data
{
    public interface ITaskRepository
    {
      void Add<T>(T entity) where T: class;
      void Delete<T>(T entity) where T: class;
      Task<bool> SaveAll();
      // get all tasks        
      Task<IEnumerable<Task>> GetTasks();
      //get an individual task 
      Task<Task> GetTask();      
    }
}