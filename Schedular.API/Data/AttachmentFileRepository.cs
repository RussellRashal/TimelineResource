using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public class AttachmentFileRepository : IAttachmentFileRepository
    {
         //access to the database
        private readonly DataContext _context;
        public AttachmentFileRepository(DataContext context)
        {
            _context = context;
        }
        public void Add(AttachmentFile entity)
        {
            _context.AttachmentFiles.Add(entity);

        }
        public void Update(AttachmentFile attachmentFile) 
        {
            // get id that matches fileName and taskscheduleId
            var AttachmentFilesDb =  _context.AttachmentFiles
                .Where(f => f.FileName == attachmentFile.FileName)
                .Where(f => f.TaskScheduleId == attachmentFile.TaskScheduleId)
                .Select(t => t.Id)
                .ToList();

            //use the id to find it in the database then update the values
            var AttachmentFileDb =  _context.AttachmentFiles.SingleOrDefault(s => s.Id == AttachmentFilesDb[0]);

            AttachmentFileDb.UserId = attachmentFile.UserId;  

            _context.SaveChanges();               

        } 

        public void Delete(int id)
        {
            _context.AttachmentFiles.Remove(_context.AttachmentFiles
                .FirstOrDefault(t => t.Id == id));
            _context.SaveChanges();    
        }

        public bool alreadyExist(string filename, int taskId) 
        {
            var attachment = _context.AttachmentFiles
                .Where(at => at.FileName == filename)
                .Where(at => at.TaskScheduleId == taskId)
                .Any();
            // returns true if the values match
            return attachment;
        }

        // has the data saved
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}