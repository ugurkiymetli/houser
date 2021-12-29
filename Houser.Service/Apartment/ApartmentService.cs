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
        public ApartmentService( IMapper _mapper )
        {
            mapper = _mapper;
        }

        public General<ApartmentViewModel> Get( int pageSize, int pageNumber )
        {
            var result = new General<ApartmentViewModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Apartments.Where(a => a.IsActive && !a.IsDeleted);
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
                var data = service.Apartments.SingleOrDefault(a => a.IsActive && !a.IsDeleted && a.Id == id);
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
                model.Idatetime = DateTime.Now;
                service.Apartments.Add(model);
                service.SaveChanges();
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
                var data = service.Apartments.SingleOrDefault(u => u.IsActive && !u.IsDeleted && u.Id == id);
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