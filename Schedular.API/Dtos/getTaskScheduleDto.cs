using System;
using System.Collections.Generic;
using Schedular.API.Models;

namespace Schedular.API.Dtos
{
    public class getTaskScheduleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool isClosed { get; set; }
        public List<Note> Notes { get; set; }
        //user currently assigned to the task   
        public int UserCurrentAssignedId { get; set; }
        //user who last edited the task
        public int userLastEditId { get; set; }
        public bool hasTimeLimit { get; set; }

    }
}