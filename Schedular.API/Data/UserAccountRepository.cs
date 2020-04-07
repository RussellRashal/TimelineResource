using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public class UserAccountRepository : IUserAccountRepository
    {
        private readonly DataContext _context;
        public UserAccountRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<UserAccount> GetUser(int id)
        {            
            var user = await _context.UserAccounts.FirstOrDefaultAsync(u => u.Id == id);
            
            return user;
        }
        public async Task<UserAccount> Login(string username, string password)
        {
            //find the username in the database and assign to the variable 'userAccount'
            var userAccount = await _context.UserAccounts
            .FirstOrDefaultAsync(x => x.Username == username);

            //if the 'userAccount' comes back as no user found then return null
            if(userAccount == null)
                return null;
            //if there is a username in the database then check the password
            if(!VerifyPasswordHash(password, userAccount.PasswordHash, userAccount.PasswordSalt))
                return null;
            // return the userAccount object to allow angular to save into local area for JWT token
            return userAccount; 
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {                
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i = 0; i < computedHash.Length; i++)
                {
                    if(computedHash[i] != passwordHash[i]) return false; 
                }
            }
            return true;
        }

        public async Task<UserAccount> Register(UserAccount userAccount, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            userAccount.PasswordHash = passwordHash;
            userAccount.PasswordSalt = passwordSalt;

            await _context.UserAccounts.AddAsync(userAccount);
            await _context.SaveChangesAsync();

            return userAccount;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExist(string username)
        {
            if(await _context.UserAccounts.AnyAsync(x => x.Username == username))
                return true;
            
            return false;
        }
    }
}