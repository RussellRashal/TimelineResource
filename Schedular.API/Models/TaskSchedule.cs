using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Schedular.API.Models
{
    public class TaskSchedule
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public bool isClosed { get; set; }
        public bool highPriority { get; set; }
        public bool hasTimeLimit { get; set; }       
        public Customer customer { get; set; }
        public int? customerId { get; set; }
        public List<Note> Notes { get; set; }
        public List<AttachmentFile> Attachments { get; set; }  

        //user currently assigned to the task 
        public int userCurrentAssignedId { get; set; } 
        [ForeignKey("userCurrentAssignedId")]
        public User userCurrentAssigned { get; set; }

        //user who last edited the task
        public int userLastEditId { get; set; }
        [ForeignKey("userLastEditId")]
        public User userLastEdit { get; set; }

    }
}