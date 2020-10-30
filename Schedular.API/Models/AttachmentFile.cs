using System;

namespace Schedular.API.Models
{
    public class AttachmentFile
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public int TaskScheduleId { get; set; } 
        public DateTime DateCreated {get; set;}
        public long FileSize { get; set; }
        public User User { get; set; }
        public int UserId { get; set; } 

    }
   
}