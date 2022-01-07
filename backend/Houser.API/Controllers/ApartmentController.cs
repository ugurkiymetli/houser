using Emerce_Model;
using Houser.API.Helpers;
using Houser.Model.Apartment;
using Houser.Service.Apartment;
using Microsoft.AspNetCore.Mvc;

namespace Houser.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentController : ControllerBase
    {
        private readonly IApartmentService apartmentService;

        public ApartmentController( IApartmentService _apartmentService )
        {
            apartmentService = _apartmentService;
        }
        //Get Apartment
        [HttpGet]
        public General<ApartmentViewModel> Get( [FromQuery] int pageSize, int pageNumber )
        {
            //max page size is set to 100
            pageSize = pageSize > 100 ? 100 : pageSize;
            return apartmentService.Get(pageSize, pageNumber);
        }

        //Get Apartment By Id
        [HttpGet("{id}")]
        public General<ApartmentViewModel> GetById( int id )
        {
            return apartmentService.GetById(id);
        }
        [Admin]
        //Create Apartment
        [HttpPost]
        public General<ApartmentViewModel> Insert( [FromBody] ApartmentInsertModel newApartment )
        {
            var result = new General<ApartmentViewModel>();
            if ( newApartment.IsEmpty && newApartment.ResidentId > 0 )
            {
                result.ExceptionMessage = "Apartment cannot be empty and have residents";
                return result;
            }
            result = apartmentService.Insert(newApartment);
            return result;
        }
        [Admin]
        //Update Apartment
        [HttpPut("{id}")]
        public General<ApartmentViewModel> Update( [FromBody] ApartmentInsertModel updateApartment, int id )
        {
            return apartmentService.Update(updateApartment, id);
        }
        [Admin]
        //Delete Apartment
        [HttpDelete("{id}")]
        public General<bool> Delete( int id )
        {
            return apartmentService.Delete(id);
        }
    }
}