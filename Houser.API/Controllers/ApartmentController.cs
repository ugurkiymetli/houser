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
        [HttpPost]
        public General<ApartmentViewModel> Insert( [FromBody] ApartmentInsertModel newApartment )
        {
            return apartmentService.Insert(newApartment);
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
        //Update Apartment
        [HttpPut("{id}")]
        public General<ApartmentViewModel> Update( [FromBody] ApartmentInsertModel updateApartment, int id )
        {
            return apartmentService.Update(updateApartment, id);
        }


    }
}

