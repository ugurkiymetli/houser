using Emerce_Model;
using Houser.API.Helpers;
using Houser.Model.Payment;
using Houser.Service.Payment;
using Microsoft.AspNetCore.Mvc;

namespace Houser.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService paymentService;
        public PaymentController( IPaymentService _paymentService )
        {
            paymentService = _paymentService;
        }
        //[AllowAnonymous]
        [HttpGet]
        public General<PaymentViewModel> Get( [FromQuery] int pageSize, int pageNumber, int payerId, int apartmentId, bool isPayed )
        {
            //max and default page size is set to 15 
            pageSize = pageSize > 15 || pageSize <= 0 ? 15 : pageSize;
            //default page number is set to 1
            pageNumber = pageNumber <= 0 ? 1 : pageNumber;

            return paymentService.Get(pageSize, pageNumber, payerId, apartmentId, isPayed);
        }
        //Get Payment By Id
        [HttpGet("{id}")]
        public General<PaymentViewModel> GetById( int id )
        {
            return paymentService.GetById(id);
        }
        [Admin]
        //Create Payment
        [HttpPost]
        public General<PaymentViewModel> Insert( [FromBody] PaymentInsertModel newPayment )
        {
            var result = new General<PaymentViewModel>();
            if ( ModelState.IsValid )
            {

                result = paymentService.Insert(newPayment);
                return result;
            }
            else
            {
                result.ExceptionMessage = ModelState.ToString();
            }
            return result;
        }
        [Admin]
        //Update Payment
        [HttpPut("{id}")]
        public General<PaymentViewModel> Update( [FromBody] PaymentInsertModel updatePayment, int id )
        {
            return paymentService.Update(updatePayment, id);
        }

        //Update Paid Payment
        [HttpPut("pay")]
        public General<bool> UpdatePaid( int id )
        {
            return paymentService.UpdatePaid(id);
        }

        [Admin]
        //Delete Payment
        [HttpDelete("{id}")]
        public General<bool> Delete( int id )
        {
            return paymentService.Delete(id);
        }
    }
}

