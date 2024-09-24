using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace KF_QPMPVG_2022_2023_2_BPROF.Models
{
    public class LearningSet
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsPrivate { get; set; }

        // Navigations 

        public string OwnerId { get; set; }

        [NotMapped]
        [JsonIgnore]
        public virtual AppUser? Owner { get; set; }

        [NotMapped]
        public virtual IEnumerable<Card>? Cards { get; set; }

        public LearningSet()
        {
            this.Id = Guid.NewGuid().ToString();
        }
    }
}
