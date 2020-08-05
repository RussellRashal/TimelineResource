using System;
using System.ComponentModel.DataAnnotations;

namespace Schedular.API.Dtos
{
    public class UserForRegisterDto
    {
        // [Required]
        public string Username { get; set; }
 
        // [Required]
        // [StringLength(20,MinimumLength = 6, ErrorMessage = "You must specify password at least 6 characters")]
        public string Password { get; set; } 
    }
}