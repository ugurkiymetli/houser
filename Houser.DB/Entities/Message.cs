using System;
using System.Collections.Generic;

#nullable disable

namespace Houser.DB.Entities
{
    public partial class Message
    {
        public int Id { get; set; }
        public string MessageText { get; set; }
        public int SenderId { get; set; }
        public int RecieverId { get; set; }
        public bool IsRead { get; set; }
        public DateTime Idatetime { get; set; }

        public virtual User Reciever { get; set; }
        public virtual User Sender { get; set; }
    }
}
