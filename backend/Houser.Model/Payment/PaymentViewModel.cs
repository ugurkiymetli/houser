using System;

namespace Houser.Model.Payment
{
    public class PaymentViewModel
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public int ApartmentId { get; set; }
        public int PayerId { get; set; }
        public bool IsPayed { get; set; }
        public DateTime? PaymentDueDate { get; set; }
        public DateTime? PayedDate { get; set; }
        public DateTime Idatetime { get; set; }
        //public DateTime? Udatetime { get; set; }
    }
}
