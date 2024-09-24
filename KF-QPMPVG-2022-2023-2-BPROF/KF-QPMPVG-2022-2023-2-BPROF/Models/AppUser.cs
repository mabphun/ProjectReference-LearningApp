using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace KF_QPMPVG_2022_2023_2_BPROF.Models
{
    public class AppUser : IdentityUser
    {
        public string? Image { get; set; }
        public int TimesPlayed { get; set; }
        public int TimesCompleted { get; set; }
        
        // Navigations

        [NotMapped]
        public virtual IEnumerable<LearningSet>? OwnedSets { get; set; } // Editable sets

        public AppUser()
        {
            TimesCompleted = 0;
            TimesPlayed = 0;
            //OwnedSets = new List<LearningSet>();
        }
    }
}
