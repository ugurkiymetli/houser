using System.ComponentModel.DataAnnotations;

namespace Houser.Model.Message
{
    public class MessageInsertModel
    {
        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(100, ErrorMessage = "{0} cannot be more than {1} characters long.")]

        public string MessageText { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger than {1}")]
        public int SenderId { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger than {1}")]
        public int RecieverId { get; set; }
    }
}