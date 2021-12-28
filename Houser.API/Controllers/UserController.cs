using Emerce_Model;
using Houser.Model.User;
using Houser.Service.User;
using Microsoft.AspNetCore.Mvc;

namespace Houser.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController( IUserService _userService )
        {
            userService = _userService;
        }
        [HttpPost]
        public General<UserViewModel> Insert( [FromBody] UserCreateModel newUser )
        {
            return userService.Insert(newUser);
        }
        [HttpGet]
        public General<UserViewModel> Get()
        {
            return userService.Get();
        }
    }
}

