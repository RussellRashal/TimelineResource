using AutoMapper;
using Schedular.API.Models;
using Schedular.API.Dtos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Schedular.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserForReturnDto>();
            CreateMap<TaskSchedule, getTaskScheduleDto>();
            CreateMap<Task<IEnumerable<TaskSchedule>>, getTaskScheduleDto>();
            CreateMap<Note, noteDto>();
        }
    }
}