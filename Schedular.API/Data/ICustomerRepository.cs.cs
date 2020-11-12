using System.Threading.Tasks;

namespace Schedular.API.Data
{
    public interface ICustomerRepository
    {
        void Add<T>(T entity) where T : class;
        Task<bool> SaveAll();
        
    }
}