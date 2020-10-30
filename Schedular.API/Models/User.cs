using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Schedular.API.Models
{
    public class User: IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        // to disable account and have a time limiter on when it can be enabled again
        public bool IsEnabled { get; set; }
        public DateTime? EnableAllowDate { get; set; }

        // connect User table to the userRole join table. the below configure the relationship
        public virtual ICollection<UserRole> UserRoles {get; set;}
    }
}