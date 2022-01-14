using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Houser.Pay.Model.Payment
{
    public class PaymentInsertModel
    {
        [Required(ErrorMessage = "{0} is required.")]
        [BsonElement("userId")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [BsonElement("paymentId")]
        public int PaymentId { get; set; }

        [BsonElement("amount")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [BsonElement("cardNumber")]
        [RegularExpression("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35{3}){11})$",
            ErrorMessage = "Not a valid card number!")]
        public string CreditCardNumber { get; set; }

        [BsonElement("cardHolderName")]
        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(50, ErrorMessage = "{0} cannot be more than {1} characters long.")]
        public string CreditCardHolderName { get; set; }

        [RegularExpression(@"^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$",
            ErrorMessage = "Not a valid expiry date!")]
        [BsonElement("cardDate")]
        [Required(ErrorMessage = "{0} is required.")]
        public string CreditCardExpiryDate { get; set; }

        [RegularExpression("[1-9]{3}")]
        [BsonElement("cardCvc")]
        [Required(ErrorMessage = "{0} is required.")]
        public string CreditCardCVC { get; set; }
    }
}