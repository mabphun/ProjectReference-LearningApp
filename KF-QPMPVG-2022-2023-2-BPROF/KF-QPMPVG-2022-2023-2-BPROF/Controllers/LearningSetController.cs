using KF_QPMPVG_2022_2023_2_BPROF.Hubs;
using KF_QPMPVG_2022_2023_2_BPROF.Logics;
using KF_QPMPVG_2022_2023_2_BPROF.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace KF_QPMPVG_2022_2023_2_BPROF.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LearningSetController : ControllerBase
    {
        private ILearningSetLogic _logic;
        private IHubContext<EventHub> _connection;

        public LearningSetController(ILearningSetLogic logic, IHubContext<EventHub> connection)
        {
            _logic = logic;
            _connection = connection;
        }

        [HttpGet]
        //[Authorize]
        public IEnumerable<LearningSet> GetLearningSets()
        {
            return _logic.Read();
        }

        [HttpGet("{id}")]
        public LearningSet GetLearningSet(string id)
        {
            return _logic.Read(id);
        }

        [HttpPost]
        [Authorize]
        public async void CreateLearningSet([FromBody] LearningSet set)
        {
            set.Id = Guid.NewGuid().ToString();
            foreach (var card in set.Cards)
            {
                card.Id = Guid.NewGuid().ToString();
            }
            _logic.Create(set);
            var owner = _logic.GetOwner(set.Id);
            await _connection.Clients.All.SendAsync("setCreated", owner.UserName, set);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async void DeleteLearningSet(string id)
        {
            var set = _logic.Read(id);
            var owner = _logic.GetOwner(set.Id);

            _logic.Delete(id);
            await _connection.Clients.All.SendAsync("setDeleted", owner.UserName, set);
        }

        [HttpPut]
        [Authorize]
        public async void UpdateLearningSet([FromBody] LearningSet set)
        {
            foreach (var card in set.Cards)
            {
                if (card.Id.Length == 0)
                {
                    card.Id = Guid.NewGuid().ToString();
                }
            }
            _logic.Update(set);
            var owner = _logic.GetOwner(set.Id);
            await _connection.Clients.All.SendAsync("setEdited", owner.UserName, set);
        }
    }
}
