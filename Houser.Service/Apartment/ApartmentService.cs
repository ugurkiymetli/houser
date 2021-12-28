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
                //model.IsActive = true;
                //model.IsDeleted = false;
                //model.IsAdmin = false;
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
                //var data = service.Apartments.SingleOrDefault(a => a.Id == id);
                var data = service.Apartments.Find(id);
                if ( data is null )
                {
                    result.ExceptionMessage = $"Apartment with id: {id} is not found";
                    return result;
                }
                //mapping
                //data = mapper.Map<DB.Entities.Apartment>(updateApartment);
                //FIND A BETTER WAY FOR THE UPDATE!
                data.Block = String.IsNullOrEmpty(updateApartment.Block.Trim()) ? data.Block : updateApartment.Block;
                data.Type = String.IsNullOrEmpty(updateApartment.Type.Trim()) ? data.Type : updateApartment.Type;
                data.Floor = updateApartment.Floor;
                data.Number = updateApartment.Number;
                data.ResidentId = updateApartment.ResidentId;

                data.Udatetime = DateTime.Now;
                service.SaveChanges();
                result.Entity = mapper.Map<ApartmentViewModel>(data);
                result.IsSuccess = true;
            }
            return result;
        }
        public General<bool> Delete( int id )
        {
            throw new NotImplementedException();
        }
    }
}
