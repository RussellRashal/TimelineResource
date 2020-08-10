using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Schedular.API.Models
{
    public class User: IdentityUser<int>
    {
        // connect User table to the userRole join table. the below configure the relationship
        public virtual ICollection<UserRole> UserRoles {get; set;}
        // connect AspNetUserStaffLink table to the aspnetUser table
        public virtual ICollection<UserStaff> UserStaffs {get; set;}

    }
}