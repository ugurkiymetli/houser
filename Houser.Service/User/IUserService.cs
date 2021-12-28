using Emerce_Model;
using Houser.Model.User;

namespace Houser.Service.User
{
    public interface IUserService
    {
        public General<UserViewModel> Insert( UserCreateModel newUser );
        public General<UserViewModel> Get();
        public General<UserViewModel> GetById( int id );
        public General<bool> Delete( int id );
        public General<UserUpdateModel> Update();

    }
}
