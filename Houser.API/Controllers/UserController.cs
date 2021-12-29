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
        //Create User
        [HttpPost]
        public General<UserViewModel> Insert( [FromBody] UserInsertModel newUser )
        {
            return userService.Insert(newUser);
        }
        //Get User
        [HttpGet]
        public General<UserViewModel> Get( [FromQuery] int pageSize, int pageNumber )
        {
            //max page size is set to 15
            pageSize = pageSize > 15 || pageSize <= 0 ? 15 : pageSize;
            pageNumber = pageNumber <= 0 ? 1 : pageNumber;
            return userService.Get(pageSize, pageNumber);
        }
        //Get User By Id
        [HttpGet("{id}")]
        public General<UserViewModel> GetById( int id )
        {
            return userService.GetById(id);
        }
        //Update User
        [HttpPut("{id}")]
        public General<UserViewModel> Update( [FromBody] UserInsertModel updateUser, int id )
        {
            return userService.Update(updateUser, id);
        }
        //Delete User
        [HttpDelete("{id}")]
        public General<bool> Delete( int id )
        {
            return userService.Delete(id);
        }
    }
}

