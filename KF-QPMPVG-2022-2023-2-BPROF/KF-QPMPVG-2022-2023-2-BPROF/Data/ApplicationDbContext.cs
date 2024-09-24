using KF_QPMPVG_2022_2023_2_BPROF.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace KF_QPMPVG_2022_2023_2_BPROF.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        private readonly PasswordHasher<AppUser> ph = new PasswordHasher<AppUser>();

        public DbSet<AppUser> Users { get; set; }
        public DbSet<LearningSet> Sets { get; set; }
        public DbSet<Card> Cards { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            :base (options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AppUser>()
                .HasMany(t => t.OwnedSets)
                .WithOne(t => t.Owner)
                .HasForeignKey(t => t.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<LearningSet>()
                .HasMany(t => t.Cards)
                .WithOne(t => t.LearningSet)
                .HasForeignKey(t => t.LearningSetId)
                .OnDelete(DeleteBehavior.Cascade);


            // DB SEED

            builder.Entity<IdentityRole>().HasData(
                new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
                new { Id = "2", Name = "User", NormalizedName = "USER" }
            );

            AppUser user1 = new AppUser()
            {
                Id = Guid.NewGuid().ToString(),
                Email = "user1@user.hu",
                EmailConfirmed = true,
                UserName = "user1",
                NormalizedUserName = "USER1",
                Image = "https://picsum.photos/200/300",
                OwnedSets = new List<LearningSet>()
            };
            AppUser user2 = new AppUser()
            {
                Id = Guid.NewGuid().ToString(),
                Email = "user2@user.hu",
                EmailConfirmed = true,
                UserName = "user2",
                NormalizedUserName = "USER2",
                Image = "https://picsum.photos/200/300",
                OwnedSets = new List<LearningSet>()
            };
            AppUser akos = new AppUser()
            {
                Id = Guid.NewGuid().ToString(),
                Email = "molnar.akos@user.hu",
                EmailConfirmed = true,
                UserName = "molnara",
                NormalizedUserName = "MOLNARA",
                Image = "https://fastly.picsum.photos/id/916/200/200.jpg?hmac=hEUrLG-ayFdIoyHKUwazT8SMEsVxWH9xGz4tx-e0cN0",
                OwnedSets = new List<LearningSet>()
            };
            user1.PasswordHash = ph.HashPassword(user1, "user1234"); //user1 | user1234
            user2.PasswordHash = ph.HashPassword(user2, "user1234"); //user1 | user1234
            akos.PasswordHash = ph.HashPassword(akos, "user1234"); //user1 | user1234
            builder.Entity<AppUser>().HasData(user1, user2, akos);

            LearningSet set1 = new LearningSet()
            {
                Name = "Test1",
                Description = "TestDesc1",
                IsPrivate = false,
                OwnerId = user1.Id,
                Cards = new List<Card>()
            };
            LearningSet set2 = new LearningSet()
            {
                Name = "Test2",
                Description = "TestDesc2",
                IsPrivate = true,
                OwnerId = user2.Id,
                Cards = new List<Card>()
            };
            LearningSet engSet = new LearningSet()
            {
                Name = "English test",
                Description = "This is an english test",
                IsPrivate = false,
                OwnerId = akos.Id,
                Cards = new List<Card>()
            };
            LearningSet set4 = new LearningSet()
            {
                Name = "LearningSet4",
                Description = "LearningSetDesc4",
                IsPrivate = true,
                OwnerId = user2.Id,
                Cards = new List<Card>()
            };
            LearningSet set5 = new LearningSet()
            {
                Name = "Random learning set",
                Description = "Random description",
                IsPrivate = false,
                OwnerId = akos.Id,
                Cards = new List<Card>()
            };
            builder.Entity<LearningSet>().HasData(set1, set2, engSet, set4, set5);

            Card card1 = new Card()
            {
                Question = "Test?",
                Answer = "Test!",
                Image = "https://picsum.photos/200/300",
                LearningSetId = set1.Id
            };
            Card card2 = new Card()
            {
                Question = "Apple",
                Answer = "Alma",
                Image = "",
                LearningSetId = engSet.Id
            };
            Card card3 = new Card()
            {
                Question = "Car",
                Answer = "Autó",
                Image = "",
                LearningSetId = engSet.Id
            };
            Card card4 = new Card()
            {
                Question = "Plane",
                Answer = "Repülő",
                Image = "https://picsum.photos/200/300",
                LearningSetId = engSet.Id
            };
            Card card5 = new Card()
            {
                Question = "Test Question",
                Answer = "Test Answer",
                Image = "https://picsum.photos/200/300",
                LearningSetId = set5.Id
            };
            builder.Entity<Card>().HasData(card1, card2, card3, card4, card5);

            base.OnModelCreating(builder);
        }
    }
}
