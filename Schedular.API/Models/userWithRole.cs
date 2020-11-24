using System;

namespace Schedular.API.Models
{
    public class userWithRoleName
    {
        public int Id { get; set; }
        public string Username { get; set; } 

        // to disable account and have a time limiter on when it can be enabled again
        public bool IsEnabled { get; set; }
        public DateTime EnableAllowDate { get; set; }

        public string RoleName { get; set; }
    }
}