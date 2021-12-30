using AutoMapper;
using Emerce_Model;
using Houser.DB;
using Houser.Model.Payment;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Houser.Service.Payment
{
    public class PaymentService : IPaymentService

    {
        private readonly IMapper mapper;
        public PaymentService( IMapper _mapper )
        {
            mapper = _mapper;
        }
        public General<PaymentViewModel> Get()
        {
            var result = new General<PaymentViewModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Payments.Where(p => !p.IsDeleted && !p.IsPayed);
                data = data.OrderBy(p => p.Id);
                if ( !data.Any() )
                {
                    result.ExceptionMessage = $"No payment found!";
                    return result;
                }
                result.List = mapper.Map<List<PaymentViewModel>>(data);
                result.IsSuccess = true;
                result.TotalCount = data.Count();
            }
            return result;
        }

        public General<PaymentViewModel> GetById( int id )
        {
            var result = new General<PaymentViewModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Payments.SingleOrDefault(p => !p.IsDeleted && !p.IsPayed && p.Id == id);
                if ( data is null )
                {
                    result.ExceptionMessage = $"No payment found with id:{id}!";
                    return result;
                }
                result.Entity = mapper.Map<PaymentViewModel>(data);
                result.IsSuccess = true;
                result.TotalCount = 1;
            }
            return result;
        }

        public General<PaymentViewModel> Insert( PaymentInsertModel newPayment )
        {
            var result = new General<PaymentViewModel>();
            var model = mapper.Map<DB.Entities.Payment>(newPayment);
            using ( var service = new HouserContext() )
            {
                bool isPaymentCreated = service.Payments.Any(p =>
                p.PaymentDueDate == newPayment.PaymentDueDate &&
                p.Type == newPayment.Type &&
                p.ApartmentId == newPayment.ApartmentId);
                if ( isPaymentCreated )
                {
                    //make it better
                    result.ExceptionMessage = $"Payment already created! Apartment: {model.ApartmentId} - {model.Type} - {model.Amount}₺ - {model.PaymentDueDate.ToShortDateString()}!";
                    return result;
                }
                model.Idatetime = DateTime.Now;
                service.Payments.Add(model);
                service.SaveChanges();
                result.Entity = mapper.Map<PaymentViewModel>(model);
                result.IsSuccess = true;
            }
            return result;
        }

        public General<PaymentViewModel> Update( PaymentInsertModel updatePayment, int id )
        {
            var result = new General<PaymentViewModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Payments.Find(id);
                if ( data is null || data.IsDeleted )
                {
                    result.ExceptionMessage = $"Payment with id: {id} is not found";
                    return result;
                }
                //mapping
                data = mapper.Map(updatePayment, data);
                data.Udatetime = DateTime.Now;
                service.SaveChanges();
                result.Entity = mapper.Map<PaymentViewModel>(data);
                result.IsSuccess = true;
            }
            return result;

        }
        public General<bool> Delete( int id )
        {
            var result = new General<bool>();
            using ( var service = new HouserContext() )
            {
                var data = service.Payments.SingleOrDefault(p => !p.IsDeleted && p.Id == id);
                if ( data is null )
                {
                    result.ExceptionMessage = $"Payment with id: {id} is not found";
                    return result;
                }
                if ( data.IsPayed )
                {
                    result.ExceptionMessage = $"You cannot delete payed item!";
                    return result;
                }
                data.IsDeleted = true;
                service.SaveChanges();
                result.IsSuccess = true;
            }
            return result;
        }
    }
}
