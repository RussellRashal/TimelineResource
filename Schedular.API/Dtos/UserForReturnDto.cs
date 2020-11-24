using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Schedular.API.Models;

namespace Schedular.API.Dtos
{
    public class UserForReturnDto
    {
        public int Id { get; set; }
        public string Username { get; set; }  
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? EnableAllowDate { get; set; }
        public virtual ICollection<UserRole> UserRoles {get; set;}
        public int roleId { get; set; }

    }
}