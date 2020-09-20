using System;
using Schedular.API.Models;

namespace Schedular.API.Dtos
{
    public class noteDto
    {
        public int Id { get; set; }
        public string NotesInfo { get; set; }
        public DateTime DateCreated {get; set;}
        public int UserId { get; set; } 
    }
}