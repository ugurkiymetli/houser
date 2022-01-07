namespace Houser.Service.Helpers
{
    public interface IJwtUtils
    {
        public string GenerateToken( Houser.DB.Entities.User user );
        public int? ValidateToken( string token );
    }
}
