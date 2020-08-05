using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Schedular.API.Models
{
    public class Role : IdentityRole<int>
    {
        // connect User table to the userRole join table. the below configure the relationship
         public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}