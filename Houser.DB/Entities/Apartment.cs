using System;

#nullable disable

namespace Houser.DB.Entities
{
    public partial class Apartment
    {
        public int Id { get; set; }
        public string Block { get; set; }
        public int Number { get; set; }
        public int Floor { get; set; }
        public int? ResidentId { get; set; }
        public string Type { get; set; }
        public bool IsEmpty { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime Idatetime { get; set; }
        public DateTime? Udatetime { get; set; }
        public virtual User Resident { get; set; }
    }
}
