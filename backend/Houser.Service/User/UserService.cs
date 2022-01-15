using AutoMapper;
using Emerce_Model;
using Houser.DB;
using Houser.Model.User;
using Houser.Service.Helpers;
using PasswordGenerator;
using System;
using System.Collections.Generic;
using System.Linq;
using BCryptNet = BCrypt.Net.BCrypt;

namespace Houser.Service.User
{
    public class UserService : IUserService
    {
        private readonly IMapper mapper;
        private IJwtUtils jwtUtils;
        public UserService( IMapper _mapper, IJwtUtils _jwtUtils )
        {
            mapper = _mapper;
            jwtUtils = _jwtUtils;
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
                bool isUserCreated = service.Users.Any(u => u.Email == model.Email && u.IdentityNum == model.IdentityNum);
                if ( isUserCreated )
                {
                    result.ExceptionMessage = $"User is already created!";
                    return result;
                }
                if ( newUser.ApartmentId is not null || newUser.ApartmentId < 0 )
                {
                    var apartment = service.Apartments.Find(newUser.ApartmentId);
                    if ( apartment is null )
                    {
                        result.ExceptionMessage = $"Entered user with id: {newUser.ApartmentId} is not found";
                        return result;
                    }
                }


                /*** Generate password maker ***/
                var pwd = new Password().IncludeLowercase().IncludeUppercase().LengthRequired(10);
                /*** Generate Password ***/
                string password = pwd.Next();
                /*** Hash Password ***/
                result.ExceptionMessage = password;
                model.Password = BCryptNet.HashPassword(password);

                model.Idatetime = DateTime.Now;
                service.Users.Add(model);
                service.SaveChanges();
                //update apartment if new inserted user has one 
                if ( model.ApartmentId is not null || model.ApartmentId > 0 )
                {
                    var apartment = service.Apartments.Find(model.ApartmentId);
                    apartment.ResidentId = model.Id;
                    service.SaveChanges();
                }
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
                if ( data.ApartmentId is not null && updateUser.ApartmentId is null )
                {
                    var apartment = service.Apartments.Find(data.ApartmentId);
                    apartment.ResidentId = null;
                    apartment.IsEmpty = true;
                }

                if ( updateUser.ApartmentId is not null )
                {
                    var apartment = service.Apartments.Find(updateUser.ApartmentId);
                    apartment.ResidentId = id;
                    apartment.IsEmpty = false;
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
                result.Entity = true;
            }
            return result;
        }
        public General<UserLoginResponseModel> Login( UserLoginRequestModel loginUser )
        {
            var result = new General<UserLoginResponseModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Users.SingleOrDefault(u => u.Email == loginUser.Email);
                //validation
                if ( data is null || !BCryptNet.Verify(loginUser.Password, data.Password) )
                {
                    result.ExceptionMessage = "Username or password is incorrect";
                    return result;
                }
                result.IsSuccess = true;
                result.Entity = mapper.Map<UserLoginResponseModel>(data);
                result.Entity.Token = jwtUtils.GenerateToken(data);
            }
            return result;
        }
        public General<bool> IsUserAdmin( int id )
        {
            var result = new General<bool>();

            using ( var service = new HouserContext() )
            {
                result.IsSuccess = service.Users.Any(u => u.Id == id && u.IsAdmin);
            }
            return result;
        }
    }
}