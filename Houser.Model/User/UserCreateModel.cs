namespace Houser.Model.User
{
    public class UserCreateModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNum { get; set; }
        public string IdentityNum { get; set; }
        public string CarPlateNum { get; set; }
        public int? ApartmentId { get; set; }
    }
}
