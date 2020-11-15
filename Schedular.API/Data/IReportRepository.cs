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
        Task<PagedList<TaskSchedule>> GetTasksWithinHoursWorkedRepo(int id, DateTime startDate, DateTime endDate, TaskParams taskParams);      

    }
}