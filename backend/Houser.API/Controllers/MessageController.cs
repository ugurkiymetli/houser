using Emerce_Model;
using Houser.API.Helpers;
using Houser.Model.Message;
using Houser.Service.Message;
using Microsoft.AspNetCore.Mvc;

namespace Houser.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService messageService;

        public MessageController( IMessageService _messageService )
        {
            messageService = _messageService;
        }
        //Get Message List 
        [HttpGet]
        public General<MessageViewModel> Get( [FromQuery] int receiverId )
        {
            return messageService.Get(receiverId);
        }
        //Get Message Detail
        [HttpGet]
        [Route("detail")]
        public General<MessageViewModel> GetDetail( [FromQuery] int receiverId, int senderId )
        {
            return messageService.GetDetail(receiverId, senderId);
        }
        //Insert Message
        [HttpPost]
        public General<bool> Insert( [FromBody] MessageInsertModel newMessage )
        {
            return messageService.Insert(newMessage);
        }
    }
}