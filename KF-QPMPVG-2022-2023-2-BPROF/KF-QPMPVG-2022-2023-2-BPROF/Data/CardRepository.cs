using KF_QPMPVG_2022_2023_2_BPROF.Models;

namespace KF_QPMPVG_2022_2023_2_BPROF.Data
{
    public class CardRepository : ICardRepository
    {
        private readonly ApplicationDbContext _context;

        public CardRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Create(Card card)
        {
            var old = _context.Cards.FirstOrDefault(t => t.Id == card.Id);
            if (old != null)
            {
                throw new ArgumentException("There's already a card with this id: " + card.Id);
            }

            _context.Cards.Add(card);
            _context.SaveChanges();
        }

        public IEnumerable<Card> Read()
        {
            return _context.Cards;
        }

        public Card Read(string id)
        {
            var card = _context.Cards.FirstOrDefault(t => t.Id == id);
            if (card == null)
            {
                throw new ArgumentException("There's no card with this id: " + id);
            }
            return card;
        }

        public void Delete(string id)
        {
            var card = _context.Cards.FirstOrDefault(t => t.Id == id);
            if (card == null)
            {
                throw new ArgumentException("There's no card with this id: " + id);
            }

            _context.Cards.Remove(card);
            _context.SaveChanges();
        }

        public void Update(Card card)
        {
            var old = _context.Cards.FirstOrDefault(t => t.Id == card.Id);
            if (old == null)
            {
                throw new ArgumentException("There's no card with this id: " + card.Id);
            }
            old.Question = card.Question;
            old.Answer = card.Answer;
            old.Image = card.Image;

            _context.SaveChanges();
        }
    }
}
