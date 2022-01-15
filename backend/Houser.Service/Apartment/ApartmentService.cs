using AutoMapper;
using Emerce_Model;
using Houser.DB;
using Houser.Model.Apartment;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Houser.Service.Apartment
{
    public class ApartmentService : IApartmentService
    {
        private readonly IMapper mapper;
        //private readonly IUserService userService;
        public ApartmentService( IMapper _mapper/*, IUserService _userService */)
        {
            mapper = _mapper;
            //userService = _userService;
        }

        public General<ApartmentViewModel> Get( int pageSize, int pageNumber )
        {
            var result = new General<ApartmentViewModel>();
            using ( var service = new HouserContext() )
            {
                //has global filter = isActive && !isDeleted
                var data = service.Apartments.Where(a => a.Id > 0);
                data = data.OrderBy(a => a.Id);
                data = data.Skip(( pageNumber - 1 ) * pageSize).Take(pageSize);
                if ( !data.Any() )
                {
                    result.ExceptionMessage = $"No apartment found!";
                    return result;
                }
                result.List = mapper.Map<List<ApartmentViewModel>>(data);
                result.Queries = $"pageSize={pageSize}, pageNumber={pageNumber}";
                result.IsSuccess = true;
                result.TotalCount = data.Count();
            }
            return result;
        }
        public General<ApartmentViewModel> GetById( int id )
        {
            var result = new General<ApartmentViewModel>();
            using ( var service = new HouserContext() )
            {
                //has global filter = isActive && !isDeleted
                var data = service.Apartments.SingleOrDefault(a => a.Id == id);
                if ( data is null )
                {
                    result.ExceptionMessage = $"No apartment found!";
                    return result;
                }
                result.Entity = mapper.Map<ApartmentViewModel>(data);
                result.IsSuccess = true;
                result.TotalCount = 1;
            }
            return result;
        }
        public General<ApartmentViewModel> Insert( ApartmentInsertModel newApartment )
        {
            var result = new General<ApartmentViewModel>();
            var model = mapper.Map<DB.Entities.Apartment>(newApartment);
            using ( var service = new HouserContext() )
            {
                bool isApartmentCreated = service.Apartments.Any(a =>
                a.Block == model.Block &&
                a.Number == model.Number);
                if ( isApartmentCreated )
                {
                    result.ExceptionMessage = $"Apartment with block-number {model.Block}-{model.Number} and  is already created!";
                    return result;
                }
                if ( ( !newApartment.IsEmpty && newApartment.ResidentId == null ) || ( newApartment.IsEmpty && newApartment.ResidentId != null ) )
                {
                    result.ExceptionMessage = !newApartment.IsEmpty && newApartment.ResidentId == null
                        ? "Apartment cant be empty and have resident"
                        : "Apartment cant have resident and be empty!";
                    return result;
                }
                if ( newApartment.ResidentId is not null || newApartment.ResidentId < 0 )
                {
                    var user = service.Users.Find(newApartment.ResidentId);
                    if ( user is null )
                    {
                        result.ExceptionMessage = $"Entered user with id: {newApartment.ResidentId} is not found";
                        return result;
                    }
                }
                model.Idatetime = DateTime.Now;
                service.Apartments.Add(model);
                service.SaveChanges();
                if ( model.ResidentId is not null || model.ResidentId < 0 )
                {
                    var user = service.Users.Find(model.ResidentId);
                    user.ApartmentId = model.Id;
                    service.SaveChanges();
                }
                result.Entity = mapper.Map<ApartmentViewModel>(model);
                result.IsSuccess = true;
            }
            return result;
        }

        public General<ApartmentViewModel> Update( ApartmentInsertModel updateApartment, int id )
        {
            var result = new General<ApartmentViewModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Apartments.Find(id);
                if ( data is null )
                {
                    result.ExceptionMessage = $"Apartment with id: {id} is not found";
                    return result;
                }

                //if entered resident id is not found return error.
                if ( updateApartment.ResidentId is not null || updateApartment.ResidentId < 0 )
                {
                    var user = service.Users.Find(updateApartment.ResidentId);
                    if ( user is null )
                    {
                        result.ExceptionMessage = $"Entered user with id: {updateApartment.ResidentId} is not found";
                        return result;
                    }
                }

                //check if empty and has residents or not empty and no residents.
                if ( ( updateApartment.IsEmpty && updateApartment.ResidentId != null ) || ( !updateApartment.IsEmpty && updateApartment.ResidentId == null ) )
                {
                    result.ExceptionMessage = updateApartment.IsEmpty && updateApartment.ResidentId != null ? "Apartment cant be empty and have resident"
                        : "Apartment cant have resident and be empty!";
                    return result;
                }
                //clear resident from apartment
                if ( data.ResidentId is not null && updateApartment.ResidentId is null )
                {
                    var user = service.Users.Find(data.ResidentId);
                    user.ApartmentId = null;
                }
                //update user with apartment id data
                if ( updateApartment.ResidentId is not null || updateApartment.ResidentId > 0 )
                {
                    var user = service.Users.Find(updateApartment.ResidentId);
                    user.ApartmentId = id;
                }
                //mapping
                data = mapper.Map(updateApartment, data);
                data.Udatetime = DateTime.Now;
                service.SaveChanges();
                result.Entity = mapper.Map<ApartmentViewModel>(data);
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
                var data = service.Apartments.SingleOrDefault(u => u.Id == id);
                if ( data is null )
                {
                    result.ExceptionMessage = $"No apartment found!";
                    return result;
                }
                if ( data.ResidentId is not null )
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