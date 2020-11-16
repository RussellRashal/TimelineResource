using System;
using System.Threading.Tasks;
using Schedular.API.Helpers;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public interface IReportRepository
    {
        Task<TimeSpan> GetHoursWorkedRepo(int id, DateTime startDate, DateTime endDate);  
        //get users hour taskSchedule
        Task<PagedList<TaskSchedule>> GetTasksWithinHoursWorkedRepo(int id, DateTime startDate, 
            DateTime endDate, TaskParams taskParams);      
        //Task customer by time
        Task<PagedList<TaskSchedule>> GetTaskByCustomerTime(int customerId, 
            DateTime startDate, DateTime endDate, TaskParams taskParams);
        
        //All Tasks by customer
        Task<PagedList<TaskSchedule>> GetAllTaskByCustomer(int customerId, TaskParams taskParams);

        //High priority tasks by time
        Task<PagedList<TaskSchedule>> GetHighPriorityTasks( 
            DateTime startDate, DateTime endDate, TaskParams taskParams);

        //All High priority tasks 
        Task<PagedList<TaskSchedule>> GetAllHighPriorityTasks(TaskParams taskParams);
    }
}