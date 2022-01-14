using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Houser.Pay.Model.Payment
{
    public class PaymentViewModel
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

        [BsonElement("paymentDate")]
        public DateTime PaymentDate { get; set; }
    }
}
