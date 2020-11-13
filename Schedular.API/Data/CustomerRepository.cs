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

         // update customers
        public void Update(int Id, Customer customer) 
        {
            var CustomersDb =  _context.Customers.SingleOrDefault(s => s.Id == Id);

            CustomersDb.Name = customer.Name;
            CustomersDb.Address = customer.Address;
            CustomersDb.AdditionalInfo = customer.AdditionalInfo;

            _context.SaveChanges();
        } 

        // Delete data
        public void Delete(int id)
        {
            _context.Customers.Remove(_context.Customers
                .FirstOrDefault(t => t.Id == id));
            _context.SaveChanges();        
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}