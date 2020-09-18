using System;

namespace Schedular.API.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string NotesInfo { get; set; }
        public DateTime dateCreated {get; set;}
        public TaskSchedule taskSchedule {get; set;}
        public User user { get; set; }
        public int userId { get; set; } 
    }
}