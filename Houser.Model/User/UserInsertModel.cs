using System.ComponentModel.DataAnnotations;

namespace Houser.Model.User
{
    public class UserInsertModel
    {
        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(50, ErrorMessage = "{0} cannot be more than {1} characters long.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(50, ErrorMessage = "{0} cannot be more than {1} characters long.")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [RegularExpression("^(53)([1-9]{1})?([0-9]{3})?([0-9]{2})?([0-9]{2})$", ErrorMessage = "Not a valid phone number.")]
        public string PhoneNum { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [RegularExpression("^[0-9]{11}$", ErrorMessage = "Not a valid identity number.")]
        public string IdentityNum { get; set; }

        [RegularExpression("^([0-9]{2})([A-Z]{1,3})([0-9]{2,4})$", ErrorMessage = "Not a valid car plate number.")]
        public string CarPlateNum { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger than {1}")]
        public int? ApartmentId { get; set; }
    }
}
