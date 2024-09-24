using KF_QPMPVG_2022_2023_2_BPROF.Models;

namespace KF_QPMPVG_2022_2023_2_BPROF.Data
{
    public class LearningSetRepository : ILearningSetRepository
    {
        private readonly ApplicationDbContext _context;

        public LearningSetRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public AppUser GetOwner(string setId)
        {
            var set = _context.Sets.FirstOrDefault(t => t.Id == setId);
            if (set == null)
            {
                throw new ArgumentException("There's no Set with this id: " + setId);
            }
            var user = _context.Users.FirstOrDefault(t => t.Id == set.OwnerId);
            if (user == null)
            {
                throw new ArgumentException("There's no User with this id: " + set.OwnerId);
            }
            return user;
        }

        public void Create(LearningSet set)
        {
            var old = _context.Sets.FirstOrDefault(t => t.Id == set.Id);
            if (old != null)
            {
                throw new ArgumentException("There's already a Set with this id: " + set.Id);
            }

            _context.Sets.Add(set);
            _context.SaveChanges();
        }

        public IEnumerable<LearningSet> Read()
        {
            return _context.Sets;
        }

        public LearningSet Read(string id)
        {
            var set = _context.Sets.FirstOrDefault(t => t.Id == id);
            if (set == null)
            {
                throw new ArgumentException("There's no Set with this id: " + id);
            }
            return set;
        }

        public void Delete(string id)
        {
            var set = _context.Sets.FirstOrDefault(t => t.Id == id);
            if (set == null)
            {
                throw new ArgumentException("There's no Set with this id: " + id);
            }

            _context.Sets.Remove(set);
            _context.SaveChanges();
        }

        public void Update(LearningSet set)
        {
            var old = _context.Sets.FirstOrDefault(t => t.Id == set.Id);
            if (old == null)
            {
                throw new ArgumentException("There's no Set with this id: " + set.Id);
            }
            old.Name = set.Name;
            old.Description = set.Description;
            old.IsPrivate = set.IsPrivate;
            //old.Cards = set.Cards;

            foreach (var card in set.Cards.ToList())
            {
                var oldCard = _context.Cards.FirstOrDefault(t => t.Id == card.Id);
                if (oldCard == null)
                {
                    _context.Cards.Add(new Card()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Question = card.Question,
                        Answer = card.Answer,
                        Image = card.Image,
                        LearningSetId = set.Id
                    });
                    //throw new ArgumentException("There's no Card with this id: " + set.Id);
                }
                else
                {
                    oldCard.Question = card.Question;
                    oldCard.Answer = card.Answer;
                    oldCard.Image = card.Image;
                }
            }


            _context.SaveChanges();
        }
    }
}
