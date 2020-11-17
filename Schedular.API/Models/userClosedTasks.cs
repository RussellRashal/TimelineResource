namespace Schedular.API.Models
{
    public class userClosedTasks
    {
        public userClosedTasks(string username, int closedtask)
        {
                userName = username;
                closedTasks = closedtask;

        }
        public string userName { get; set; }
        public int closedTasks { get; set; }
    }
}