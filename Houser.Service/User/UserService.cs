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
        public General<UserViewModel> Get( int pageSize, int pageNumber )
        {
            var result = new General<UserViewModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Users.Where(u => u.Id > 0);
                data = data.OrderBy(u => u.Id);
                data = data.Skip(( pageNumber - 1 ) * pageSize).Take(pageSize);
                if ( !data.Any() )
                {
                    result.ExceptionMessage = $"No user found!";
                    return result;
                }
                result.List = mapper.Map<List<UserViewModel>>(data);
                result.Queries = $"pageSize={pageSize}, pageNumber={pageNumber}";
                result.IsSuccess = true;
                result.TotalCount = data.Count();
            }
            return result;
        }
        public General<UserViewModel> GetById( int id )
        {
            var result = new General<UserViewModel>();
            using ( var service = new HouserContext() )
            {
                //has global filter = isActive && !isDeleted
                var data = service.Users.SingleOrDefault(u => u.Id == id);
                if ( data is null )
                {
                    result.ExceptionMessage = $"No user found!";
                    return result;
                }
                result.Entity = mapper.Map<UserViewModel>(data);
                result.IsSuccess = true;
                result.TotalCount = 1;
            }
            return result;
        }
        public General<UserViewModel> Insert( UserInsertModel newUser )
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
                /***Generate Password - Work in Progress ***/
                //model.Password = GeneratePassword();
                model.Password = "abc123";
                service.Users.Add(model);
                service.SaveChanges();
                result.Entity = mapper.Map<UserViewModel>(model);
                result.IsSuccess = true;
            }
            return result;
        }
        public General<UserViewModel> Update( UserInsertModel updateUser, int id )
        {
            var result = new General<UserViewModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Users.Find(id);
                //has global filter = isActive && !isDeleted
                if ( data is null )
                {
                    result.ExceptionMessage = $"User with id: {id} is not found";
                    return result;
                }
                //mapping
                data = mapper.Map(updateUser, data);
                data.Udatetime = DateTime.Now;
                service.SaveChanges();
                result.Entity = mapper.Map<UserViewModel>(data);
                result.IsSuccess = true;
            }
            return result;
        }
        public General<bool> Delete( int id )
        {
            var result = new General<bool>();
            using ( var service = new HouserContext() )
            {
                //has global filter = isActive && !isDeleted
                var data = service.Users.SingleOrDefault(u => u.Id == id);
                if ( data is null )
                {
                    result.ExceptionMessage = $"No user found!";
                    return result;
                }
                if ( data.ApartmentId is not null )
                {
                    result.ExceptionMessage = $"Please remove user from apartment!";
                    return result;
                }
                data.IsActive = false;
                data.IsDeleted = true;
                service.SaveChanges();
                result.IsSuccess = true;
            }
            return result;
        }
    }
}