namespace Houser.Model.User
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNum { get; set; }
        public bool IsAdmin { get; set; }
        public string IdentityNum { get; set; }
        public string CarPlateNum { get; set; }
        public int ApartmentId { get; set; }
    }
}