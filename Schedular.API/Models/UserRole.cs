using Microsoft.AspNetCore.Identity;

namespace Schedular.API.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        // connects to the user and role table
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}