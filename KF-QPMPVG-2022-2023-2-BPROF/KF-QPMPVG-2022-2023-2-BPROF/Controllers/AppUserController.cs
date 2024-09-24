using KF_QPMPVG_2022_2023_2_BPROF.Logics;
using KF_QPMPVG_2022_2023_2_BPROF.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KF_QPMPVG_2022_2023_2_BPROF.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private IAppUserLogic _logic;

        public AppUserController(IAppUserLogic logic)
        {
            _logic = logic;
        }

        [HttpGet]
        public IEnumerable<AppUser> GetAppUsers()
        {
            return _logic.Read();
        }

        [HttpGet("{id}")]
        public AppUser GetAppUser(string id)
        {
            return _logic.Read(id);
        }

        [HttpPost]
        public void CreateUser([FromBody] AppUser user)
        {
            _logic.Create(user);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public void DeleteUser(string id)
        {
            _logic.Delete(id);
        }

        [HttpPut]
        [Authorize]
        public void UpdateUser([FromBody] AppUser user)
        {
            _logic.Update(user);
        }
    }
}
