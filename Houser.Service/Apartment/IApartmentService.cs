using Emerce_Model;
using Houser.Model.Apartment;

namespace Houser.Service.Apartment
{
    public interface IApartmentService
    {
        public General<ApartmentViewModel> Insert( ApartmentCreateModel newApartment );
        public General<ApartmentViewModel> Get();
    }
}
