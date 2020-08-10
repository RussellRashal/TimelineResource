using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Schedular.API.Models;

namespace Schedular.API.Models
{
    public class UserStaff
    {
        public User Users { get; set; }
        public int UserId { get; set; }        
        public Staff Staffs { get; set; }
        public int StaffId { get; set; }

    }
}