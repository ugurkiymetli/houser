namespace Houser.Model.Apartment
{
    public class ApartmentViewModel
    {
        public int Id { get; set; }
        public string Block { get; set; }
        public int Number { get; set; }
        public int Floor { get; set; }
        public int? ResidentId { get; set; }
        public string Type { get; set; }
        public bool? IsEmpty { get; set; }
    }
}
