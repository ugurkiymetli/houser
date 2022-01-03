using System;
using System.Collections.Generic;

#nullable disable

namespace Houser.DB.Entities
{
    public partial class User
    {
        public User()
        {
            Apartments = new HashSet<Apartment>();
            MessageRecievers = new HashSet<Message>();
            MessageSenders = new HashSet<Message>();
            Payments = new HashSet<Payment>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNum { get; set; }
        public string IdentityNum { get; set; }
        public string CarPlateNum { get; set; }
        public int? ApartmentId { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime Idatetime { get; set; }
        public DateTime? Udatetime { get; set; }

        public virtual ICollection<Apartment> Apartments { get; set; }
        public virtual ICollection<Message> MessageRecievers { get; set; }
        public virtual ICollection<Message> MessageSenders { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}