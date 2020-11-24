using System;

namespace Schedular.API.Models
{
    public class userWithRole
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        // to disable account and have a time limiter on when it can be enabled again
        public bool IsEnabled { get; set; }
        public DateTime EnableAllowDate { get; set; }

        public string RoleName { get; set; }
    }
}