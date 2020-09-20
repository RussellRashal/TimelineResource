using System.Threading.Tasks;
using System.Collections.Generic;
using Schedular.API.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Schedular.API.Data
{
    public interface INotesRepository
    {
        void Add<T>(T entity) where T: class;
        void Update(int Id, Note note) ;
        void Delete(int id); 
        Task<bool> SaveAll();
        //get an individual note 
        Task<IList<Note>> GetNote(int id);   
    }
}