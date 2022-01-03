using System;

namespace Houser.Model.Message
{
    public class MessageViewModel
    {
        public int Id { get; set; }
        public string MessageText { get; set; }
        public int SenderId { get; set; }
        public int RecieverId { get; set; }
        public bool IsRead { get; set; }
        public DateTime Idatetime { get; set; }
    }
}