using System.Collections.Generic;
using System.Linq;
using Schedular.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Schedular.API.Data
{
    public class Seed
    {        
        public static void SeedRoles(RoleManager<Role> roleManager)
        {
            //create some roles
            var roles = new List<Role>
            {
                new Role{Name = "Admin"},
                new Role{Name = "Manager"},
                new Role{Name = "Staff"},
            };

            foreach (var role in roles)
            {
                roleManager.CreateAsync(role).Wait();                    
            }            
        }    
    }
}