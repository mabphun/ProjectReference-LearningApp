using KF_QPMPVG_2022_2023_2_BPROF.Data;
using KF_QPMPVG_2022_2023_2_BPROF.Models;

namespace KF_QPMPVG_2022_2023_2_BPROF.Logics
{
    public class LearningSetLogic : ILearningSetLogic
    {
        private readonly ILearningSetRepository _repo;

        public LearningSetLogic(ILearningSetRepository repo)
        {
            _repo = repo;
        }

        public void Create(LearningSet learningSet)
        {
            // Validations can be here
            _repo.Create(learningSet);
        }

        public AppUser GetOwner(string setId)
        {
            return _repo.GetOwner(setId);
        }

        public IEnumerable<LearningSet> Read()
        {
            return _repo.Read();
        }

        public LearningSet Read(string id)
        {
            return _repo.Read(id);
        }

        public void Delete(string id)
        {
            _repo.Delete(id);
        }

        public void Update(LearningSet learningSet)
        {
            _repo.Update(learningSet);
        }
    }
}
