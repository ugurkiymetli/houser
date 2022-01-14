using Houser.Pay.Model.Payment;
using System.Collections.Generic;

namespace Houser.Pay.Service.Payment
{
    public interface IPaymentService
    {
        public IEnumerable<PaymentViewModel> Get();
        public IEnumerable<PaymentViewModel> GetByUserId( int userId );

        public bool Insert( PaymentInsertModel insertPayment );
    }
}
