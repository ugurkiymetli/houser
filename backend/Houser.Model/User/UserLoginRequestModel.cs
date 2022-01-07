using System.ComponentModel.DataAnnotations;

namespace Houser.Model.User
{
    public class UserLoginRequestModel
    {
        [Required(ErrorMessage = "{0} is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        public string Password { get; set; }
    }
}
