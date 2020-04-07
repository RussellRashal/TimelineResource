using AutoMapper;
using Schedular.API.Models;
using Schedular.API.Dtos;


namespace Schedular.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserAccountRegisterDto, UserAccount>();
            CreateMap<UserAccount, UserAccountReturnDto>();
        }
    }
}