using System.Collections.Generic;
using System.Threading.Tasks;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public interface ICustomerRepository
    {
        void Add<T>(T entity) where T : class;
        Task<bool> SaveAll();

        Task<IList<Customer>> GetCustomer(int id);

        Task<IList<Customer>> GetCustomers();
        
    }
}