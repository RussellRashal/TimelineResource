using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public class CustomerRepository: ICustomerRepository
    {
        private readonly DataContext _context;
        public CustomerRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public async Task<IList<Customer>> GetCustomer(int id)
        {    
            var customer = await _context.Customers
                .Where(u => u.Id == id)
                .ToListAsync();
                
            return customer;  
        }  

        public async Task<IList<Customer>> GetCustomers()
        {    
            var customers = await _context.Customers
                .ToListAsync();
                
            return customers;  
        }  

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}