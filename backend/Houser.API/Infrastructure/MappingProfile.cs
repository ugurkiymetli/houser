using AutoMapper;
using Houser.DB.Entities;
using Houser.Model.Apartment;
using Houser.Model.Message;
using Houser.Model.Payment;
using Houser.Model.User;

namespace Houser.API.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            /*** USER MAPS ***/
            //user create and update
            CreateMap<User, UserInsertModel>().ReverseMap();
            //user view
            CreateMap<User, UserViewModel>().ReverseMap();
            //user login 
            CreateMap<User, UserLoginResponseModel>().ReverseMap();


            /*** APARTMENT MAPS ***/
            //apartment create and update
            CreateMap<Apartment, ApartmentInsertModel>().ReverseMap();
            //apartment view
            CreateMap<Apartment, ApartmentViewModel>().ReverseMap();


            /*** PAYMENT MAPS ***/
            //payment create and update
            CreateMap<Payment, PaymentInsertModel>().ReverseMap();
            //payment view
            CreateMap<Payment, PaymentViewModel>().ReverseMap();


            /*** MESSAGE MAPS ***/
            //message create 
            CreateMap<Message, MessageInsertModel>().ReverseMap();
            //message view
            CreateMap<Message, MessageViewModel>().ReverseMap();
        }
    }
}