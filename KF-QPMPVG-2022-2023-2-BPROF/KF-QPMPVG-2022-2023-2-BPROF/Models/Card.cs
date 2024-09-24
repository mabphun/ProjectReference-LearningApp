using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace KF_QPMPVG_2022_2023_2_BPROF.Models
{
    public class Card
    {
        [Key]
        public string Id { get; set; }

        public string Question { get; set; }

        public string Answer { get; set; }

        public string Image { get; set; }

        public string LearningSetId { get; set; }

        [NotMapped]
        [JsonIgnore]
        public virtual LearningSet? LearningSet { get; set; }

        public Card()
        {
            this.Id = Guid.NewGuid().ToString();
        }

    }
}
