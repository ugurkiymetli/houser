using Emerce_Model;
using Houser.Model.Payment;
using Houser.Service.Payment;
using Microsoft.AspNetCore.Mvc;

namespace Houser.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService userService;

        public PaymentController( IPaymentService _userService )
        {
            userService = _userService;
        }
        //Get Payment
        //[HttpGet]
        //public General<PaymentViewModel> Get( [FromQuery] int pageSize, int pageNumber )
        //{
        //    //max page size is set to 15
        //    pageSize = pageSize > 15 || pageSize <= 0 ? 15 : pageSize;
        //    pageNumber = pageNumber <= 0 ? 1 : pageNumber;
        //    return userService.Get(pageSize, pageNumber);
        //}

        [HttpGet]
        public General<PaymentViewModel> Get( [FromQuery] int pageSize, int pageNumber, int payerId, int apartmentId, bool isPayed )
        {
            //max and default page size is set to 15 
            pageSize = pageSize > 15 || pageSize <= 0 ? 15 : pageSize;
            //default page number is set to 1
            pageNumber = pageNumber <= 0 ? 1 : pageNumber;

            return userService.Get(pageSize, pageNumber, payerId, apartmentId, isPayed);
        }
        //Get Payment By Id
        [HttpGet("{id}")]
        public General<PaymentViewModel> GetById( int id )
        {
            return userService.GetById(id);
        }
        //Create Payment
        [HttpPost]
        public General<PaymentViewModel> Insert( [FromBody] PaymentInsertModel newPayment )
        {
            var result = new General<PaymentViewModel>();
            if ( ModelState.IsValid )
            {

                result = userService.Insert(newPayment);
                return result;
            }
            else
            {
                result.ExceptionMessage = ModelState.ToString();
            }
            return result;
        }

        //Update Payment
        [HttpPut("{id}")]
        public General<PaymentViewModel> Update( [FromBody] PaymentInsertModel updatePayment, int id )
        {
            return userService.Update(updatePayment, id);
        }
        //Delete Payment
        [HttpDelete("{id}")]
        public General<bool> Delete( int id )
        {
            return userService.Delete(id);
        }
    }
}

