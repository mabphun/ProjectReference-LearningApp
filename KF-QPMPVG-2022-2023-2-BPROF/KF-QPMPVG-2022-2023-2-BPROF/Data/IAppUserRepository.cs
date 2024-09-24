using KF_QPMPVG_2022_2023_2_BPROF.Models;

namespace KF_QPMPVG_2022_2023_2_BPROF.Data
{
    public interface IAppUserRepository
    {
        void Create(AppUser user);
        void Delete(string id);
        IEnumerable<AppUser> Read();
        AppUser Read(string id);
        void Update(AppUser user);
    }
}