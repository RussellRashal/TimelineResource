using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;

namespace Schedular.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, 
    IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, 
    IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        
        public DbSet<TaskSchedule> TaskSchedules { get; set; }
        public DbSet<Note> Notes { get; set; }

         protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //configure the one to one relationship with the user and role with userRole table
            builder.Entity<UserRole>(userRole => 
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
                
                 userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            // builder.Entity<TaskSchedule>().HasData(
            //     new TaskSchedule{Id = 1, Title = "create this to achieve that", Start = new DateTime(2020, 9, 14, 12, 12, 00), End = new DateTime(2020, 9, 14, 14, 45, 00), userId = 1},
            //     new TaskSchedule{Id = 2, Title = "Antoher task to do", Start = new DateTime(2020, 9, 14, 12, 00, 00), End = new DateTime(2020, 9, 14, 17, 30, 00), userId = 2},
            //     new TaskSchedule{Id = 3, Title = "collection of objects", Start = new DateTime(2020, 9, 15, 11, 14, 00), End = new DateTime(2020, 9, 15, 16, 00, 00), userId = 3},
            //     new TaskSchedule{Id = 4, Title = "removal needed to clear", Start = new DateTime(2020, 9, 16, 10, 30, 00), End = new DateTime(2020, 9, 16, 15, 30, 00), userId = 1},
            //     new TaskSchedule{Id = 5, Title = "create documentation needed", Start = new DateTime(2020, 9, 16, 12, 12, 00), End = new DateTime(2020, 9, 16, 15, 36, 00), userId = 2},
            //     new TaskSchedule{Id = 6, Title = "setup equipment for the day", Start = new DateTime(2020, 9, 18, 11, 30, 00), End = new DateTime(2020, 9, 18, 15, 30, 00), userId = 3},
            //     new TaskSchedule{Id = 7, Title = "speak to other customers in regards to", Start = new DateTime(2020, 9, 15, 15, 30, 00), End = new DateTime(2020, 9, 15, 18, 30, 00), userId = 1},
            //     new TaskSchedule{Id = 8, Title = "allow for time to be selected within", Start = new DateTime(2020, 9, 12, 15, 30, 00), End = new DateTime(2020, 9, 15, 18, 30, 00), userId = 2}
            // );

            
        }
    }
}

