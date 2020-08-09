using System.Collections.Generic;

namespace Schedular.API.Models
{
    public class Staff
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public virtual ICollection<AspNetUserStaffLink> AspNetUserStaffLinks { get; set; }

    }
}