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
        public General<PaymentViewModel> Get( int pageSize, int pageNumber, int payerId, int apartmentId, bool isPayed )
        {
            var result = new General<PaymentViewModel>();
            using ( var service = new HouserContext() )
            {
                //has global filter = !isDeleted
                //var data = service.Payments.Where(p => p.Id > 0);
                var data = service.Payments.Where(p => true);
                //filters payed payments
                data = isPayed ? data.Where(p => p.IsPayed) : data;
                //if payerId entered, gets payer's payments.
                data = payerId > 0 ? data.Where(p => p.PayerId == payerId) : data;
                //if apartmentID entered, gets apartment's payments.
                data = apartmentId > 0 ? data.Where(p => p.ApartmentId == apartmentId) : data;
                data = data.Skip(( pageNumber - 1 ) * pageSize).Take(pageSize);
                data = data.OrderBy(p => p.Id);
                if ( !data.Any() )
                {
                    result.ExceptionMessage = $"No payment found!";
                    return result;
                }
                result.List = mapper.Map<List<PaymentViewModel>>(data);
                result.IsSuccess = true;
                result.Queries = $"payerId={payerId}, isPayed={isPayed}";
                result.TotalCount = data.Count();
            }
            return result;
        }

        public General<PaymentViewModel> GetById( int id )
        {
            var result = new General<PaymentViewModel>();
            using ( var service = new HouserContext() )
            {
                //has global filter = !isDeleted
                var data = service.Payments.SingleOrDefault(p => p.Id == id);
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
                    result.ExceptionMessage = $"Payment already created! Apartment: {model.ApartmentId} - {model.Type} - {model.PaymentDueDate.ToShortDateString()}!";
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
                //has global filter = !isDeleted
                if ( data is null )
                {
                    result.ExceptionMessage = $"Payment with id: {id} is not found";
                    return result;
                }
                if ( data.IsPayed )
                {
                    result.ExceptionMessage = "Payed items can't be changed!";
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
                //has global filter = !isDeleted
                var data = service.Payments.SingleOrDefault(p => p.Id == id);
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

        public General<bool> UpdatePaid( int id )
        {
            var result = new General<bool>();
            using ( var service = new HouserContext() )
            {
                //has global filter = !isDeleted
                var data = service.Payments.SingleOrDefault(p => p.Id == id);
                if ( data is null )
                {
                    result.ExceptionMessage = $"Payment with id: {id} is not found";
                    return result;
                }
                if ( data.IsPayed )
                {
                    result.ExceptionMessage = $"Payment has already been made!";
                    return result;
                }
                data.IsPayed = true;
                data.PayedDate = DateTime.Now;
                service.SaveChanges();
                result.IsSuccess = true;
            }
            return result;
        }
    }
}