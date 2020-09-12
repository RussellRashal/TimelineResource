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
            var users = await _context.Users.ToListAsync();
            
            return users;
        }        
    }
}