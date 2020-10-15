using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using Schedular.API.Helpers;

namespace Schedular.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class uploadDownloadController : ControllerBase
    {
          //uploading a file
        [HttpPost("upload")]  
        public IActionResult upload(IEnumerable<IFormFile> files)
        {
           // string storageLocation = @"C:\storage\" + enviroment.customerName + @"\";
            string storageLocation= "sftp://192.168.0.38/var/storage/customerOne";
           // request.Credentials = new NetworkCredential("user", "password");
            int i = 0;  
            foreach(var file in files)
            {
                string extention = Path.GetExtension(file.FileName).ToLower();
                if(extention == ".docx" || extention == ".pdf" || extention == ".jpg" || extention == ".png" 
                    || extention == ".xls" || extention == ".xlsx" || extention == ".ppt" || extention == ".pttx" 
                    || extention == ".txt" || extention == ".avi" || extention == ".mp4" || extention == ".mp3")
                {
                    // check i has not already been taken, if it has increment to one again
                    using(var fileStream = new FileStream(Path.Combine(storageLocation,
                     "file" + i + extention), FileMode.Create, FileAccess.Write))
                    {
                        file.CopyTo(fileStream);
                        // use current date time for the file name, therefore youll never have the same file name.
                    }
                }
                else
                {
                    return BadRequest();
                }                
                i ++;
            }
            return Ok();      
        }
    //     //downloading a file 
    //     [HttpGet("download")]
    //     public async IActionResult download(string filename)
    //     {
    //         string test = enviroment.customerName;
    //         if (filename == null)  
    //             return Content("filename not present");  

    //         string path = @"D:\fileUpload\companyOne";
            
    //         var memory = new MemoryStream();            
    //         using (var stream = new FileStream(path, FileMode.Open))  
    //         {  
    //             await stream.CopyToAsync(memory);  
    //         }  
    //         memory.Position = 0; 
    //         return File(memory, GetContentType(path), Path.GetFileName(path)); 
    //     }
    //     private string GetContentType(string path)
    //     {
    //         var types = GetMimeTypes();
    //         var ext = Path.GetExtension(path).ToLowerInvariant();
    //         return types[ext];
    //     }
    //     private Dictionary<string, string> GetMimeTypes()
    //     {
    //         return new Dictionary<string, string>
    //         {
    //             {".txt", "text/plain"},
    //             {".pdf", "application/pdf"},
    //             {".doc", "application/vnd.ms-word"},
    //             {".docx", "application/vnd.ms-word"},
    //             {".xls", "application/vnd.ms-excel"},
    //             {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
    //             {".png", "image/png"},
    //             {".jpg", "image/jpeg"},
    //             {".jpeg", "image/jpeg"},
    //             {".gif", "image/gif"},
    //             {".csv", "text/csv"}
    //         };
    //     }
     }
}