using GameStore.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Data;

public class GameStoreContext(DbContextOptions<GameStoreContext> options) : DbContext(options)
{
    public DbSet<Game> Games => Set<Game>();

    public DbSet<Genre> Genres => Set<Genre>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Genre>().HasData(
            new { Id = 1, Name = "Fighting" },
            new { Id = 2, Name = "Roleplaying" },
            new { Id = 3, Name = "Sports" },
            new { Id = 4, Name = "Racing" },
            new { Id = 5, Name = "Open World" },
            new { Id = 6, Name = "Shooter" },
            new { Id = 7, Name = "Platformer" },
            new { Id = 8, Name = "Simulation" },
            new { Id = 9, Name = "Strategy" },
            new { Id = 10, Name = "Adventure" },
            new { Id = 11, Name = "Puzzle" },
            new { Id = 12, Name = "Survival" },
            new { Id = 13, Name = "Stealth" },
            new { Id = 14, Name = "Horror" },
            new { Id = 15, Name = "Sandbox" },
            new { Id = 16, Name = "Tower Defense" },
            new { Id = 17, Name = "Visual Novel" }
        );
    }
}
