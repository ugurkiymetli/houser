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
        public General<ApartmentViewModel> Insert( [FromBody] ApartmentCreateModel newApartment )
        {
            return apartmentService.Insert(newApartment);
        }
        [HttpGet]
        public General<ApartmentViewModel> Get()
        {
            return apartmentService.Get();
        }
    }
}

