namespace Schedular.API.Models
{
    public class PasswordReset
    {
        public string Username { get; set; }
        public string NewPassword { get; set; }
        public string CurrentPassword { get; set; }
    }
}