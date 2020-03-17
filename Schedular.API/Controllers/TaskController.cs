using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Schedular.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<string>> GetAction()
        {
            //query using repository
            //filter using DTO
            //return DTO
            return Ok();
        }  
    }
}
