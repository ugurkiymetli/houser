using Emerce_Model;
using Houser.Model.Message;
namespace Houser.Service.Message
{
    public interface IMessageService
    {
        public General<MessageViewModel> Get( int receiverId );
        public General<MessageViewModel> GetDetail( int receiverId, int senderId );
        public General<bool> Insert( MessageInsertModel newMessage );
    }
}