using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Schedular.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, 
    IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, 
    IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        
        public DbSet<TaskSchedule> TaskSchedules { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<UserStaff> UserStaffs { get; set; }        

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

            // link table primary keys for AspNetUserStaffLinkTbl
            builder.Entity<UserStaff>(UserStaff => 
            {
                UserStaff.HasKey(ur => new {ur.UserId, ur.StaffId});

                UserStaff
                    .HasOne(ur => ur.Staffs)
                    .WithMany(a => a.UserStaffs)
                    .HasForeignKey(asl => asl.StaffId)
                    .IsRequired();
                
                 UserStaff
                    .HasOne(ur => ur.Users)
                    .WithMany(a => a.UserStaffs)
                    .HasForeignKey(asl => asl.UserId)
                    .IsRequired();
            });
        }
    }
}

