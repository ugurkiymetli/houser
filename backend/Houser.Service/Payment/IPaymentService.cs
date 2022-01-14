using Emerce_Model;
using Houser.Model.Payment;

namespace Houser.Service.Payment
{
    public interface IPaymentService
    {
        public General<PaymentViewModel> Get( int pageSize, int pageNumber, int payerId, int apartmentId, bool isPayed );
        public General<PaymentViewModel> GetById( int id );
        public General<PaymentViewModel> Insert( PaymentInsertModel newPayment );
        public General<PaymentViewModel> Update( PaymentInsertModel updatePayment, int id );
        public General<bool> UpdatePaid( int id );
        public General<bool> Delete( int id );
    }
}
