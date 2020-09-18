using System.Linq;
using Schedular.API.Models;

namespace Schedular.API.Data
{
    public class NotesRepository
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
        public Note Update(int Id, Note note) 
        {
            var NoteDb =  _context.Notes.SingleOrDefault(s => s.Id == Id);

            NoteDb.NotesInfo = note.NotesInfo;
            

            _context.SaveChanges();

            return NoteDb;

        } 

        // Delete data
        public void Delete(int id)
        {
            _context.Notes.Remove(_context.Notes
                .FirstOrDefault(t => t.Id == id));
            _context.SaveChanges();        
        }  
    }
}