using System;
using System.Collections.Generic;

namespace Schedular.API.Models
{
    public class TaskSchedule
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public User user { get; set; }
        public int userId { get; set; } 
        public List<Note> Notes { get; set; }  
        public User userLastEdit { get; set; }
        public int userLastEditId { get; set; } 
    }
}