using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Schedular.API.Data;
using Schedular.API.Models;

namespace Schedular.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController] 
    public class NotesController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly INotesRepository _repo; 

        public NotesController(INotesRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> PostNote(Note note)
        {
            // prefill userid and have todays date put on for the note that's created today
            note.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            DateTime thisDay = DateTime.Now;
            string NowDate =  thisDay.ToString("g");
            note.DateCreated = Convert.ToDateTime(NowDate);

            _repo.Add(note);

            if(await _repo.SaveAll())
                return Ok();   
            return BadRequest("Failed to save Notes");  

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSchedule(int id, [FromBody] Note note)
        {
            //get note information from db so see who created the note, only allowing the creator to edit
            var noteFromDb = await _repo.GetNote(id);

            // can update only if they are the ones who originaly created the note
            if (noteFromDb[0].UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                _repo.Update(id, note);
                return Ok();  
            }
            else {     
                return BadRequest("Unauthorised"); 
            }  
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskSchedule(int id)
        {
            //get task id to see userID, check if user ID matches with the ID that is asking it to be deleted
            var noteFromDb = await _repo.GetNote(id);
            //convert using dto to view userID. needs converting from Task<IEnumerable<TaskSchedule>> to TaskSchedule
            //var userIdOnTaskDto = _mapper.Map<getTaskScheduleDto>(taskSchedule); 
            var userIDVlaue = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (noteFromDb[0].UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                _repo.Delete(id);
                 return Ok();
            }
            else if (User.IsInRole("Manager") || User.IsInRole("Admin")) {
                _repo.Delete(id);
                 return Ok();
            } 
            else {
                return BadRequest("Unauthorised");
            }           
        }




    }

}