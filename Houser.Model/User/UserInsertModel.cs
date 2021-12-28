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
        public string Email { get; set; }
        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(50, ErrorMessage = "{0} cannot be more than {1} characters long.")]
        public string PhoneNum { get; set; }
        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(11, ErrorMessage = "{0} cannot be more than {1} characters long.")]
        public string IdentityNum { get; set; }
        public string CarPlateNum { get; set; }
        public int? ApartmentId { get; set; }
    }
}
