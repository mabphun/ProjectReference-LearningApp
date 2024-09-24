using KF_QPMPVG_2022_2023_2_BPROF.Data;
using KF_QPMPVG_2022_2023_2_BPROF.Models;

namespace KF_QPMPVG_2022_2023_2_BPROF.Logics
{
    public class CardLogic : ICardLogic
    {
        private readonly ICardRepository _repo;

        public CardLogic(ICardRepository repo)
        {
            _repo = repo;
        }

        public void Create(Card card)
        {
            // Validations can be here
            _repo.Create(card);
        }

        public IEnumerable<Card> Read()
        {
            return _repo.Read();
        }

        public Card Read(string id)
        {
            return _repo.Read(id);
        }

        public void Delete(string id)
        {
            _repo.Delete(id);
        }

        public void Update(Card card)
        {
            _repo.Update(card);
        }
    }
}
