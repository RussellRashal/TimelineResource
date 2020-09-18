using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Schedular.API.Controllers
{
    public class NotesController: ControllerBase
    {
        private readonly IMapper _mapper;

        public NotesController(IMapper mapper)
        {
            _mapper = mapper;
        }
        //[HttpGet]
        // public async Task<IActionResult> getNotesOfTask()
        // {
        //     // create repository and interface to return notes with task
        // }
    }

}