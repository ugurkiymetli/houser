using AutoMapper;
using Emerce_Model;
using Houser.DB;
using Houser.Model.User;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Houser.Service.User
{
    public class UserService : IUserService
    {
        private readonly IMapper mapper;
        public UserService( IMapper _mapper )
        {
            mapper = _mapper;
        }

        public General<bool> Delete( int id )
        {
            throw new NotImplementedException();
        }

        public General<UserViewModel> Get()
        {
            var result = new General<UserViewModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Users
                    .Where(u => u.IsActive && !u.IsDeleted)
                    .OrderBy(u => u.Id);
                if ( !data.Any() )
                {
                    result.ExceptionMessage = $"No user found!";
                    return result;
                }
                result.List = mapper.Map<List<UserViewModel>>(data);
                result.IsSuccess = true;
                result.TotalCount = data.Count();
            }
            return result;
        }

        public General<UserViewModel> GetById( int id )
        {
            throw new NotImplementedException();
        }

        public General<UserViewModel> Insert( UserCreateModel newUser )
        {
            var result = new General<UserViewModel>();
            var model = mapper.Map<DB.Entities.User>(newUser);
            using ( var service = new HouserContext() )
            {
                bool isUserCreated = service.Users.Any(u => u.IdentityNum == model.IdentityNum);
                if ( isUserCreated )
                {
                    result.ExceptionMessage = $"User with identity number {model.IdentityNum} is already created!";
                    return result;
                }
                model.Idatetime = DateTime.Now;
                model.IsActive = true;
                model.IsDeleted = false;
                model.IsAdmin = false;
                //model.Password = GeneratePassword ();
                model.Password = "abc123";
                service.Users.Add(model);
                service.SaveChanges();
                result.Entity = mapper.Map<UserViewModel>(model);
            }
            return result;
        }

        public General<UserUpdateModel> Update()
        {
            throw new NotImplementedException();
        }
    }
}
