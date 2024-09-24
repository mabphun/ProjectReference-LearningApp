using KF_QPMPVG_2022_2023_2_BPROF.Models;

namespace KF_QPMPVG_2022_2023_2_BPROF.Logics
{
    public interface ILearningSetLogic
    {
        void Create(LearningSet learningSet);
        void Delete(string id);
        AppUser GetOwner(string setId);
        IEnumerable<LearningSet> Read();
        LearningSet Read(string id);
        void Update(LearningSet learningSet);
    }
}