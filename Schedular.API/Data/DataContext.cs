using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options){}    
        
        public DbSet<TaskSchedule> TaskSchedules { get; set; }
        public DbSet<Staff> Staffs { get; set; }
    }
}

