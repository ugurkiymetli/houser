namespace Houser.Model.User
{
    public class UserLoginResponseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public int ApartmentId { get; set; }
        public string Token { get; set; }
    }
}