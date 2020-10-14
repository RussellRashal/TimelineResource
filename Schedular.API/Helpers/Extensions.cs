using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Schedular.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
        //sending information down to the client for the pagination
        public static void AddPagination(this HttpResponse response, 
            int currentPage, int itemsPerPage, int totalItems, int totalPages)
            {
                var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);

                //serializeObject() converts it to camelCase
                var camelCaseformatter = new JsonSerializerSettings();
                camelCaseformatter.ContractResolver = new CamelCasePropertyNamesContractResolver();

                //convert 'paginationHeader' from object to string using jsonConvert
                response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseformatter));
                //expose the headers so that we dont get a cors error
                response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
                //request a specific page number and page size
            }
    }
}