﻿using System;

namespace Houser.Model.Apartment
{
    public class ApartmentCreateModel
    {
        public string Block { get; set; }
        public int Number { get; set; }
        public int Floor { get; set; }
        public int? ResidentId { get; set; }
        public string Type { get; set; }
        public bool? IsEmpty { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime Idatetime { get; set; }
    }
}
