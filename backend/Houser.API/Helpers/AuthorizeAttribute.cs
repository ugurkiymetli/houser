using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;

namespace Houser.API.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {

        public void OnAuthorization( AuthorizationFilterContext context )
        {
            // skip authorization if action is decorated with [AllowAnonymous] attribute
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            if ( allowAnonymous )
                return;
            // authorization
            var user = context.HttpContext.Items["User"];
            if ( user == null )
            {
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
                return;
            }
            //admin attribute
            var allowAdmin = context.ActionDescriptor.EndpointMetadata.OfType<AdminAttribute>().Any();
            if ( allowAdmin )
            {
                bool isAdmin = ( bool )context.HttpContext.Items["IsAdmin"];
                if ( !isAdmin )
                    context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}