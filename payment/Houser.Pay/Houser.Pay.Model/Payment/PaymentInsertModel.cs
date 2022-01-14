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
        public string CreditCardNumber { get; set; }
        [BsonElement("cardHolderName")]
        [Required(ErrorMessage = "{0} is required.")]
        public string CreditCardHolderName { get; set; }

        [BsonElement("cardDate")]
        [Required(ErrorMessage = "{0} is required.")]
        public string CreditCardDueDate { get; set; }

        [BsonElement("cardCvc")]
        [Required(ErrorMessage = "{0} is required.")]
        public string CreditCardCVC { get; set; }
    }
}
