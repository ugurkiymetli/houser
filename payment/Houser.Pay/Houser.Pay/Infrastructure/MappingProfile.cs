using AutoMapper;
using Houser.Pay.DB.Entities;
using Houser.Pay.Model.Payment;

namespace Houser.Pay.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Payment, PaymentViewModel>().ReverseMap();
            CreateMap<Payment, PaymentInsertModel>().ReverseMap();
        }
    }
}