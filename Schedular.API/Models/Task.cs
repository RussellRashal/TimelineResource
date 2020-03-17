using System;

namespace Schedular.API.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string MyProperty { get; set; }
        public DateTime StartsAt { get; set; }
        public DateTime EndsAt { get; set; }
    }
}