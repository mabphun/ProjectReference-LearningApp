using KF_QPMPVG_2022_2023_2_BPROF.Data;
using KF_QPMPVG_2022_2023_2_BPROF.Models;

namespace KF_QPMPVG_2022_2023_2_BPROF.Logics
{
    public class AppUserLogic : IAppUserLogic
    {
        private readonly IAppUserRepository _repo;

        public AppUserLogic(IAppUserRepository repo)
        {
            _repo = repo;

            var user = _repo.Read().FirstOrDefault();
            
        }

        public void Create(AppUser user)
        {
            // Validations can be here
            _repo.Create(user);
        }

        public IEnumerable<AppUser> Read()
        {
            return _repo.Read();
        }

        public AppUser Read(string id)
        {
            return _repo.Read(id);
        }

        public void Delete(string id)
        {
            _repo.Delete(id);
        }

        public void Update(AppUser user)
        {
            _repo.Update(user);
        }
    }
}
