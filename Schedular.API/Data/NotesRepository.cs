using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public class NotesRepository : INotesRepository
    {
        private readonly DataContext _context;
        public NotesRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        //get data
        

        // update notes
        public void Update(int Id, Note note) 
        {
            var NoteDb =  _context.Notes.SingleOrDefault(s => s.Id == Id);

            NoteDb.NotesInfo = note.NotesInfo;
            NoteDb.DateCreated = note.DateCreated;            

            _context.SaveChanges();

        } 

        // Delete data
        public void Delete(int id)
        {
            _context.Notes.Remove(_context.Notes
                .FirstOrDefault(t => t.Id == id));
            _context.SaveChanges();        
        }

        // save changes
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        //get individual note
        public async Task<IList<Note>> GetNote(int id)
        {
            var note = await _context.Notes
                .Where(u => u.Id == id)
                .ToListAsync();
                
            return note;  
        }
    }
}