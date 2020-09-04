using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;
using System.Linq;

namespace Schedular.API.Data
{
    public class StaffRepository : IStaffRepository
    { 
        //access to the database
        private readonly DataContext _context;
        public StaffRepository(DataContext context)
        {
            _context = context;
        } 

        //add new data to the database      
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        //delete data from the database
        public void Delete<T>(T entity) where T : class
        {
           _context.Remove(entity);
        }
        //get individual staff data
        public async Task<Staff> GetStaff(int id)
        {
            var staff = await _context.Staffs.FirstOrDefaultAsync(u => u.Id == id);

            return staff;
        }

        //get all staff from the database
        public async Task<IEnumerable<Staff>> GetStaffs()
        {
            var staffs = await _context.Staffs.ToListAsync();
            
            return staffs;
        }

        //lets us know if changes have been saved on the database
        //if true is returned then changes have been made
        //if false is returned then no changes have been saved
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        // public async Task<IEnumerable<UserStaff>> GetUserLinkStaff(int id)
        // {
        //     var staff = await _context.UserStaffs            
        //     //.Include(s => s.Staffs)
        //     .Where(u => u.UserId == id)
        //     .Include(s => s.Staffs)
        //     .ToListAsync(); 

        //     return staff;
        // }

        
        public async Task<UserStaff> GetUserLinkStaff(int id)
        {
            var staff = await _context.UserStaffs
                .Include(o => o.Staffs)
                .FirstOrDefaultAsync(u => u.UserId == id);
            


            return staff;
        }
    }
}