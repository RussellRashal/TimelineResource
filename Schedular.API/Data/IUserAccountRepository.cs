using System.Threading.Tasks;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public interface IUserAccountRepository
    {
        Task<UserAccount> GetUser(int id);
        Task<UserAccount> Register(UserAccount user, string password);
        Task<UserAccount> Login(string username, string password); 
        Task<bool> UserExist(string username);
    }
}