using KF_QPMPVG_2022_2023_2_BPROF.Models;

namespace KF_QPMPVG_2022_2023_2_BPROF.Data
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly ApplicationDbContext _context;

        public AppUserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Create(AppUser user)
        {
            var old = _context.Users.FirstOrDefault(t => t.Id == user.Id);
            if (old != null)
            {
                throw new ArgumentException("There's already a user with this id: " + user.Id);
            }

            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public IEnumerable<AppUser> Read()
        {
            return _context.Users;
        }

        public AppUser Read(string id)
        {
            var user = _context.Users.FirstOrDefault(t => t.Id == id);
            if (user == null)
            {
                throw new ArgumentException("There's no user with this id: " + id);
            }
            return user;
        }

        public void Delete(string id)
        {
            var user = _context.Users.FirstOrDefault(t => t.Id == id);
            if (user == null)
            {
                throw new ArgumentException("There's no user with this id: " + id);
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public void Update(AppUser user)
        {
            var old = _context.Users.FirstOrDefault(t => t.Id == user.Id);
            if (old == null)
            {
                throw new ArgumentException("There's no user with this id: " + user.Id);
            }
            old.Image = user.Image;
            old.TimesCompleted = user.TimesCompleted;
            old.TimesPlayed = user.TimesPlayed;

            _context.SaveChanges();
        }
    }
}
