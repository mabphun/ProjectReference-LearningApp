using KF_QPMPVG_2022_2023_2_BPROF.Models;

namespace KF_QPMPVG_2022_2023_2_BPROF.Logics
{
    public interface ICardLogic
    {
        void Create(Card card);
        void Delete(string id);
        IEnumerable<Card> Read();
        Card Read(string id);
        void Update(Card card);
    }
}