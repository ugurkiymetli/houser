using Emerce_Model;
using Houser.Model.Apartment;

namespace Houser.Service.Apartment
{
    public interface IApartmentService
    {
        public General<ApartmentViewModel> Insert( ApartmentInsertModel newApartment );
        public General<ApartmentViewModel> Get( int pageSize, int pageNumber );
        public General<ApartmentViewModel> GetById( int id );
        public General<ApartmentViewModel> Update( ApartmentInsertModel updateApartment, int id );
        public General<bool> Delete( int id );

    }
}
