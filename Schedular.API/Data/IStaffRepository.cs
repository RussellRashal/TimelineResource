using System.Threading.Tasks;
using System.Collections.Generic;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public interface IStaffRepository
    {
      void Add<T>(T entity) where T: class;
      void Delete<T>(T entity) where T: class;

      //"task" returns type task object, executes asyncrhonous on a thread
      //IEnumerable loops over a collection of classes
      Task<bool> SaveAll();
      // get all tasks        
      Task<IEnumerable<Staff>> GetStaffs();
      //get an individual task 
      Task<Staff> GetStaff(int id);      
    }
}