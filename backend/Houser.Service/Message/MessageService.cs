using AutoMapper;
using Emerce_Model;
using Houser.DB;
using Houser.Model.Message;
using System.Collections.Generic;
using System.Linq;

namespace Houser.Service.Message
{
    public class MessageService : IMessageService
    {
        private readonly IMapper mapper;
        public MessageService( IMapper _mapper )
        {
            mapper = _mapper;
        }
        public General<MessageViewModel> Get( int receiverId )
        {
            var result = new General<MessageViewModel>();

            using ( var service = new HouserContext() )
            {
                var data = service.Messages
                    .Where(x => x.RecieverId == receiverId)
                    .OrderByDescending(x => x.Idatetime).ToList()
                    .GroupBy(x => x.SenderId).Select(x => x.First());
                if ( !data.Any() )
                {
                    data = service.Messages
                    .Where(x => x.SenderId == receiverId)
                    .OrderByDescending(x => x.Idatetime).ToList()
                    .GroupBy(x => x.SenderId).Select(x => x.First());
                }
                if ( !data.Any() )
                {
                    result.ExceptionMessage = $"No message found!";
                    return result;
                }
                result.List = mapper.Map<List<MessageViewModel>>(data);
                result.IsSuccess = true;
                result.TotalCount = data.Count();
            }
            return result;
        }

        public General<MessageViewModel> GetDetail( int receiverId, int senderId )
        {
            var result = new General<MessageViewModel>();
            using ( var service = new HouserContext() )
            {
                var data = service.Messages
                    .Where(m => ( m.SenderId == senderId && m.RecieverId == receiverId ) || ( m.RecieverId == senderId && m.SenderId == receiverId ))
                    .OrderBy(x => x.Idatetime);
                //if no message
                if ( !data.Any() )
                {
                    result.ExceptionMessage = $"No message found!";
                    return result;
                }
                //Mark messages as read.
                foreach ( var message in data )
                {
                    message.IsRead = true;
                }
                service.SaveChanges();
                result.List = mapper.Map<List<MessageViewModel>>(data);
                result.IsSuccess = true;
                result.TotalCount = data.Count();
            }
            return result;
        }

        public General<bool> Insert( MessageInsertModel newMessage )
        {
            var result = new General<bool>();
            var model = mapper.Map<DB.Entities.Message>(newMessage);
            using ( var service = new HouserContext() )
            {
                model.Idatetime = System.DateTime.Now;
                model.IsRead = false;
                service.Messages.Add(model);
                service.SaveChanges();
                result.IsSuccess = true;
            }
            return result;
        }
    }
}
