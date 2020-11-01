using System;

namespace Schedular.API.Dtos
{
    public class UserForReturnDto
    {
        public int Id { get; set; }
        public string Username { get; set; }  
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? EnableAllowDate { get; set; }

    }
}