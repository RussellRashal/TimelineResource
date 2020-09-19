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
        public int userId { get; set; }
        public List<Note> Notes { get; set; }     

    }
}