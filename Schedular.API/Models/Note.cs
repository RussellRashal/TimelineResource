using System;

namespace Schedular.API.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string NotesInfo { get; set; }
        public DateTime DateCreated {get; set;}
        public User User { get; set; }
        public int UserId { get; set; } 
        public int TaskScheduleId { get; set; } 
    }
}