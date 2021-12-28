using AutoMapper;

namespace Houser.API.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            /* USER MAPS */
            //user create 
            CreateMap<DB.Entities.User, Model.User.UserCreateModel>();
            CreateMap<Model.User.UserCreateModel, DB.Entities.User>();
            //user view
            CreateMap<DB.Entities.User, Model.User.UserViewModel>();
            CreateMap<Model.User.UserViewModel, DB.Entities.User>();
            /* APARTMENT MAPS */
            //apartment create 
            CreateMap<DB.Entities.Apartment, Model.Apartment.ApartmentCreateModel>();
            CreateMap<Model.Apartment.ApartmentCreateModel, DB.Entities.Apartment>();
            //apartment view
            CreateMap<DB.Entities.Apartment, Model.Apartment.ApartmentViewModel>();
            CreateMap<Model.Apartment.ApartmentViewModel, DB.Entities.Apartment>();
        }
    }
}
