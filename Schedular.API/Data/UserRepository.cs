using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;
using System.Linq;

namespace Schedular.API.Data
{
    public class UserRepository : IUserRepository
    { 
        //access to the database
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        } 

        //get individual staff data
        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        //get all staff from the database
        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users
            .Where(u =>u.IsEnabled == true)
            .ToListAsync();
            
            return users;
        }

        //get total number of active users
        public int GetNumberOfActiveUsers()
        {
            var users = _context.Users.Where(u => u.IsEnabled == true).Count();
                        
            return users;
        }

        //get total number of admins 
        public int GetNumberOfAdmins()
        {
            var NumberOfAdmins = _context.UserRoles.Where(u => u.RoleId == 1).Count();
              
            return NumberOfAdmins;
        } 

        //get all enabled accounts
        public async Task<IList<userWithRole>> GetAllEnabledAccounts()
        {
            var users = await _context.Users
                .Where(u => u.IsEnabled == true)
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .SelectMany(c => c.UserRoles.Select(d => new userWithRole()
                {
                    FirstName = d.User.FirstName,
                    LastName = d.User.LastName,
                    IsEnabled = d.User.IsEnabled,
                    EnableAllowDate = d.User.EnableAllowDate,
                    RoleName = d.Role.Name
                }))
                .ToListAsync();
                        
            return users;
        }      

        //get all disabled accounts
        public async Task<IList<userWithRole>> GetAllDisabledAccounts()
        {
            var users = await _context.Users
                .Where(u => u.IsEnabled == false)
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .SelectMany(c => c.UserRoles.Select(d => new userWithRole()
                {
                    FirstName = d.User.FirstName,
                    LastName = d.User.LastName,
                    IsEnabled = d.User.IsEnabled,
                    EnableAllowDate = d.User.EnableAllowDate,
                    RoleName = d.Role.Name
                }))
                .ToListAsync();
                        
                        
            return users;
        }     
    }
}