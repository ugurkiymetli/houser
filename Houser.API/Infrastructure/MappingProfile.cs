using AutoMapper;

namespace Houser.API.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            /*** USER MAPS ***/
            //user create and update
            CreateMap<DB.Entities.User, Model.User.UserInsertModel>().ReverseMap();
            //user view
            CreateMap<DB.Entities.User, Model.User.UserViewModel>().ReverseMap();

            /*** APARTMENT MAPS ***/
            //apartment create and update
            CreateMap<DB.Entities.Apartment, Model.Apartment.ApartmentInsertModel>().ReverseMap();
            //apartment view
            CreateMap<DB.Entities.Apartment, Model.Apartment.ApartmentViewModel>().ReverseMap();

            /*** PAYMENT MAPS ***/
            //payment create and update
            CreateMap<DB.Entities.Payment, Model.Payment.PaymentInsertModel>().ReverseMap();
            //payment view
            CreateMap<DB.Entities.Payment, Model.Payment.PaymentViewModel>().ReverseMap();
        }
    }
}
