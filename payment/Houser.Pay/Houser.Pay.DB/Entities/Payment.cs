using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Houser.Pay.DB.Entities
{
    public class Payment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("userId")]
        public int UserId { get; set; }

        [BsonElement("paymentId")]
        public int PaymentId { get; set; }

        [BsonElement("amount")]
        public decimal Amount { get; set; }

        [BsonElement("cardNumber")]
        public string CreditCardNumber { get; set; }
        [BsonElement("cardHolderName")]
        public string CreditCardHolderName { get; set; }

        [BsonElement("cardDate")]
        public string CreditCardExpiryDate { get; set; }

        [BsonElement("cardCvc")]
        public string CreditCardCVC { get; set; }
        [BsonElement("paymentDate")]
        public DateTime PaymentDate { get; set; }
    }
}