using System;
using Schedular.API.Models;

namespace Schedular.API.Dtos
{
    public class getTaskScheduleDto
    {
         public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int staffId { get; set; }   

    }
}