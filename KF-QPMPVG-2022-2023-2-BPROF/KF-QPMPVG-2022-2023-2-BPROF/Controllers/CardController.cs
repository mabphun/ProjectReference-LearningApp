using KF_QPMPVG_2022_2023_2_BPROF.Logics;
using KF_QPMPVG_2022_2023_2_BPROF.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KF_QPMPVG_2022_2023_2_BPROF.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private ICardLogic _logic;

        public CardController(ICardLogic logic)
        {
            _logic = logic;
        }

        [HttpGet]
        public IEnumerable<Card> GetCards()
        {
            return _logic.Read();
        }

        [HttpGet("{id}")]
        public Card GetCard(string id)
        {
            return _logic.Read(id);
        }

        [HttpPost]
        [Authorize]
        public void CreateCard([FromBody] Card value)
        {
            _logic.Create(value);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public void DeleteCard(string id)
        {
            _logic.Delete(id);
        }

        [HttpPut]
        [Authorize]
        public void UpdateCard([FromBody] Card value)
        {
            _logic.Update(value);
        }
    }
}
