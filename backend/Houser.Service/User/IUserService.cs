using Emerce_Model;
using Houser.Model.User;

namespace Houser.Service.User
{
    public interface IUserService
    {
        public General<UserLoginResponseModel> Login( UserLoginRequestModel loginUser );
        public General<UserViewModel> Insert( UserInsertModel newUser );
        public General<UserViewModel> Get( int pageSize, int pageNumber );
        public General<UserViewModel> GetById( int id );
        public General<bool> Delete( int id );
        public General<UserViewModel> Update( UserInsertModel updateUser, int id );
        public General<bool> IsUserAdmin( int id );
    }
}