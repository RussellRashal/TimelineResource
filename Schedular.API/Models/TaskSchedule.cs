using System;

namespace Schedular.API.Models
{
    public class TaskSchedule
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public Staff staffs { get; set; }
        public int staffId { get; set; }     
    }
}