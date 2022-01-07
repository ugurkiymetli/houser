using Houser.Service.Helpers;
using Houser.Service.User;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;

namespace Houser.API.Helpers
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate next;

        public JwtMiddleware( RequestDelegate _next )
        {
            next = _next;
        }

        public async Task Invoke( HttpContext context, IUserService userService, IJwtUtils jwtUtils )
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = jwtUtils.ValidateToken(token);
            if ( userId != null )
            {
                // attach user to context on successful jwt validation
                context.Items["User"] = userService.GetById(userId.Value).Entity;
                context.Items["IsAdmin"] = userService.IsUserAdmin(userId.Value).IsSuccess;
            }
            await next(context);
        }
    }
}