using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public class TaskRepository 
    {
        //access to the database
        private readonly DataContext _context;
        public TaskRepository(DataContext context)
        {
            _context = context;
        }
        
        //add new data to the database
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        //delete data from the database
        public void Delete<T>(T entity) where T : class
        {
           _context.Remove(entity);
        }

        //get the data
        public async Task<TaskSchedule> GetTask(int id)
        {
            //remember to add users with linq include
            var taskSchedule = await _context.TaskSchedules.FirstOrDefaultAsync(u => u.Id == id);

            return taskSchedule;
        }

        public async Task<IEnumerable<TaskSchedule>> GetTasks()
        {
            var taskSchedule = await _context.TaskSchedules.ToListAsync();

            return taskSchedule;
        }

        //lets us know if changes have been saved on the database
        //if true is returned then changes have been made
        //if false is returned then no changes have been saved
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}