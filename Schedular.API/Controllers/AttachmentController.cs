using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using Schedular.API.Helpers;
using System.Linq;
using Amazon.S3;
using Amazon.S3.Transfer;
using System;
using System.Threading.Tasks;
using Amazon;
using Amazon.Runtime;
using Schedular.API.Models;
using Amazon.S3.Model;
using Schedular.API.Data;
using Newtonsoft.Json;
using System.Security.Claims;

namespace Schedular.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AttachmentFileController : ControllerBase
    {
        private readonly IAttachmentFileRepository _repo;
        public AttachmentFileController(IAttachmentFileRepository repo) 
        {
            _repo = repo;
        }    

        [HttpPost("upload/{taskId}")]  
        public async Task<IActionResult> upload(IFormFile file, int taskId)
        {
            string [] permittedExtensions = {".docx", ".pdf", ".jpg", ".png", ".xls", ".xlsx", ".ppt", 
                ".pptx", ".txt", ".avi", ".mp4", ".mp3"};

            string extension = Path.GetExtension(file.FileName).ToLower();
            long fileLength = (file.Length / 1024) + 1; //find file size in kb
            long maxSize = 30000;

            if(string.IsNullOrEmpty(extension) || permittedExtensions.Contains(extension) && fileLength < maxSize)
            {
                var credentials = new BasicAWSCredentials(enviroment.awsAccessKeyId, 
                enviroment.awsSecretAccessKey);
                var config = new AmazonS3Config 
                {
                    RegionEndpoint = Amazon.RegionEndpoint.EUWest2
                };
                using var client = new AmazonS3Client(credentials, config);             

                try
                {
                    await using var newMemoryStream = new MemoryStream();

                    file.CopyTo(newMemoryStream);

                    var uploadRequest = new TransferUtilityUploadRequest
                    {
                        InputStream = newMemoryStream,
                        Key = taskId + "/" + file.FileName,
                        BucketName = enviroment.bucketName,
                        CannedACL = S3CannedACL.PublicRead
                    };

                    var fileTransferUtility = new TransferUtility(client);
                    await fileTransferUtility.UploadAsync(uploadRequest);

                        //put the file sent in, into an attachmentFile object to be saved on the database
                        AttachmentFile newAttachment = new AttachmentFile();
                        newAttachment.FileName = file.FileName;
                        newAttachment.TaskScheduleId = taskId;
                        newAttachment.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                        newAttachment.FileSize = fileLength; 

                        DateTime thisDay = DateTime.Now;
                        string NowDate =  thisDay.ToString("g");
                        newAttachment.DateCreated = Convert.ToDateTime(NowDate);

                    //check if attachment is already in database
                    if(!_repo.alreadyExist(file.FileName, taskId))
                    {               
                        _repo.Add(newAttachment);
                        if(await _repo.SaveAll())
                            return Ok();   
                        return BadRequest();  
                    }
                    else
                    {
                        _repo.Update(newAttachment);        
                        return Ok();   
           
                    }                                        
                }
                catch (AmazonS3Exception e)
                {
                    // If bucket or object does not exist
                    Console.WriteLine("Error encountered ***. Message:'{0}' when reading object", e.Message);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Unknown encountered on server. Message:'{0}' when reading object", e.Message);
                }
            }
            return BadRequest("Bad file");
        }

        [HttpGet("download/{taskId}/{fileName}")]  
        public async Task<IActionResult> download(int taskId, string fileName)
        {
            var credentials = new BasicAWSCredentials(enviroment.awsAccessKeyId, 
            enviroment.awsSecretAccessKey);
            var config = new AmazonS3Config
            {
                RegionEndpoint = Amazon.RegionEndpoint.EUWest2
            };
            using var client = new AmazonS3Client(credentials, config);
            
            try
            {
                GetObjectRequest request = new GetObjectRequest
                {
                    BucketName = enviroment.bucketName,
                    Key = taskId + "/" + fileName
                };
                GetObjectResponse response = await client.GetObjectAsync(request);
                using Stream responseStream = response.ResponseStream;
                var stream = new MemoryStream();
                await responseStream.CopyToAsync(stream);
                stream.Position = 0;

                return new FileStreamResult(stream, response.Headers["Content-Type"])  
                {
                    FileDownloadName = fileName
                };              
            }
            catch (AmazonS3Exception e)
            {
                // If bucket or object does not exist
                Console.WriteLine("Error encountered ***. Message:'{0}' when reading object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when reading object", e.Message);
            }
            return Ok();

        }

        // [HttpPost("delete")]  
        // public ActionResult delete([FromBody] AttachmentFile attachment)
        // {
        //     return Ok();
        // }


        //[FromBody] AttachmentFile attachment
        [HttpPost("delete")]  
        public async Task<IActionResult> delete([FromBody] AttachmentFile attachment)
        {
            var credentials = new BasicAWSCredentials(enviroment.awsAccessKeyId, 
            enviroment.awsSecretAccessKey);
            var config = new AmazonS3Config
            {
                RegionEndpoint = Amazon.RegionEndpoint.EUWest2
            };
            using var client = new AmazonS3Client(credentials, config);

            try
            {
                var deleteObjectRequest = new DeleteObjectRequest
                {
                    BucketName = enviroment.bucketName,
                    Key = attachment.TaskScheduleId + "/" + attachment.FileName
                };

                Console.WriteLine("Deleting an object");
                await client.DeleteObjectAsync(deleteObjectRequest);

                //remove from the database
                _repo.Delete(attachment.Id);
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when deleting an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when deleting an object", e.Message);
            }
            return Ok();
        }
    }    
}