using System;
using System.Collections.Generic;

#nullable disable

namespace Houser.DB.Entities
{
    public partial class Payment
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public int ApartmentId { get; set; }
        public int PayerId { get; set; }
        public bool IsPayed { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime PaymentDueDate { get; set; }
        public DateTime? PayedDate { get; set; }
        public DateTime Idatetime { get; set; }
        public DateTime? Udatetime { get; set; }

        public virtual User Payer { get; set; }
    }
}
