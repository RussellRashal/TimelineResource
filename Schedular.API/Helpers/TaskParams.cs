namespace Schedular.API.Helpers
{
    public class TaskParams
    {
        //to set the defalt when the client is searching the user pagination
        private const int MaxPageSize = 50;
        public int Pagenumber { get; set; } = 1;
        private int pageSize = 10;
        //get the pageSize and set the page size no bigger than 50, if it is bigger then set it at the maxPageSize
        public int PageSize
        {
            get { return pageSize; }
            //stops client from asking a very high number of pages size returns
            //if its above 50, the turnery operator sets it back to 50
            set { pageSize = (value > MaxPageSize) ? MaxPageSize: value; }
        }        
    }
}