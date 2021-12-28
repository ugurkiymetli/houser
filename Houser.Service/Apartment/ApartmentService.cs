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
        public General<ApartmentViewModel> Get()
        {
            var result = new General<ApartmentViewModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Apartments
                    .Where(a => a.IsActive && !a.IsDeleted)
                    .OrderBy(a => a.Id);
                if ( !data.Any() )
                {
                    result.ExceptionMessage = $"No apartment found!";
                    return result;
                }
                result.List = mapper.Map<List<ApartmentViewModel>>(data);
                result.IsSuccess = true;
                result.TotalCount = data.Count();
            }
            return result;
        }
        public General<ApartmentViewModel> Insert( ApartmentCreateModel newApartment )
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
                    result.ExceptionMessage = $"Apartment with block/number {model.Block}/{model.Number} and  is already created!";
                    return result;
                }
                model.Idatetime = DateTime.Now;
                //model.IsActive = true;
                //model.IsDeleted = false;
                //model.IsAdmin = false;
                service.Apartments.Add(model);
                service.SaveChanges();
                result.Entity = mapper.Map<ApartmentViewModel>(model);
            }
            return result;

        }
    }
}
