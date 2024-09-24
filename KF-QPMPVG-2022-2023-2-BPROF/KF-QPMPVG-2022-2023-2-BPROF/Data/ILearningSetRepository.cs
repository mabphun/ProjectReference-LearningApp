using KF_QPMPVG_2022_2023_2_BPROF.Models;

namespace KF_QPMPVG_2022_2023_2_BPROF.Data
{
    public interface ILearningSetRepository
    {
        void Create(LearningSet set);
        void Delete(string id);
        AppUser GetOwner(string setId);
        IEnumerable<LearningSet> Read();
        LearningSet Read(string id);
        void Update(LearningSet set);
    }
}