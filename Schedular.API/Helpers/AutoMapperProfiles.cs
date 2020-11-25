using AutoMapper;
using Schedular.API.Models;
using Schedular.API.Dtos;
using System.Threading.Tasks;
using System.Collections.Generic;
using Schedular.API.Data;

namespace Schedular.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserForReturnDto>();
            CreateMap<TaskSchedule, getTaskScheduleDto>();
            CreateMap<TaskSchedule, getTaskScheduleIdDto>();
            CreateMap<Task<IEnumerable<TaskSchedule>>, getTaskScheduleDto>();
            CreateMap<Note, noteDto>();
            CreateMap<IAttachmentFileRepository, AttachmentFileRepository>();
            CreateMap<Customer, customerDto>();
        }
    }
}