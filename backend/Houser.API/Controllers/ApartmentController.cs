using Emerce_Model;
using Houser.Model.Apartment;
using Houser.Service.Apartment;
using Microsoft.AspNetCore.Mvc;

namespace Houser.API.Controllers
{
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
            //max page size is set to 15
            pageSize = pageSize > 15 ? 15 : pageSize;
            return apartmentService.Get(pageSize, pageNumber);
        }

        //Get Apartment By Id
        [HttpGet("{id}")]
        public General<ApartmentViewModel> GetById( int id )
        {
            return apartmentService.GetById(id);
        }
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
        //Update Apartment
        [HttpPut("{id}")]
        public General<ApartmentViewModel> Update( [FromBody] ApartmentInsertModel updateApartment, int id )
        {
            return apartmentService.Update(updateApartment, id);
        }
        //Delete Apartment
        [HttpDelete("{id}")]
        public General<bool> Delete( int id )
        {
            return apartmentService.Delete(id);
        }
    }
}