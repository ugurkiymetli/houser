using System;
using System.ComponentModel.DataAnnotations;
namespace Houser.Model.Payment
{
    public class PaymentInsertModel
    {
        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(50, ErrorMessage = "{0} cannot be more than {1} characters long.")]
        public string Type { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [Range(1, double.MaxValue, ErrorMessage = "Please enter a value bigger than {1}")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger than {1}")]
        public int ApartmentId { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger than {1}")]
        public int PayerId { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [DataType(DataType.Date)]
        public DateTime? PaymentDueDate { get; set; }
    }
}
