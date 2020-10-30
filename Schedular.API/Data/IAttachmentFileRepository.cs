using System.Collections.Generic;
using System.Threading.Tasks;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public interface IAttachmentFileRepository
    {
        void Add(AttachmentFile entity);
        void Delete(int id);
        bool alreadyExist(string filename, int taskId);
        void Update(AttachmentFile attachmentFile); 
        Task<bool> SaveAll();


    }
}