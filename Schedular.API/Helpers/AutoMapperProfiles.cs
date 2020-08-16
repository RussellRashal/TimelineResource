using AutoMapper;
using Schedular.API.Models;
using Schedular.API.Dtos;


namespace Schedular.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserForReturnDto>();
            CreateMap<TaskSchedule, getTaskScheduleDto>();
            CreateMap<Staff, staffDto>();
        }
    }
}