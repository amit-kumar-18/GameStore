using GameStore.Api.Dtos;
using GameStore.Api.Entities;

namespace GameStore.Api.Mapping;

public static class GameMapping
{
    public static Game ToEntity(this CreateGameDto game)
    {
        return new Game()
        {
            Name = game.Name,
            GenreId = game.GenreId,
            Price = game.Price,
            ReleaseDate = game.ReleaseDate,
            ImageUrl = game.ImageUrl,
            Description = game.Description,
            Publisher = game.Publisher,
            CreatedAt = DateTime.UtcNow
        };
    }

    public static Game ToEntity(this CreateGameWithImageDto game, string? imageUrl)
    {
        return new Game
        {
            Name = game.Name,
            GenreId = game.GenreId,
            Price = game.Price,
            ReleaseDate = game.ReleaseDate,
            Description = game.Description,
            Publisher = game.Publisher,
            ImageUrl = imageUrl,
            CreatedAt = DateTime.UtcNow
        };
    }

    public static void UpdateEntity(this Game game, UpdateGameWithImageDto dto, string? imageUrl = null)
    {
        game.Name = dto.Name;
        game.GenreId = dto.GenreId;
        game.Price = dto.Price;
        game.ReleaseDate = dto.ReleaseDate;
        game.Description = dto.Description;
        game.Publisher = dto.Publisher;

        if (imageUrl is not null)
        {
            game.ImageUrl = imageUrl;
        }
    }


    public static void UpdateEntity(this Game game, UpdateGameDto updatedGame)
    {
        if (updatedGame.Name is not null)
            game.Name = updatedGame.Name;

        if (updatedGame.GenreId.HasValue)
            game.GenreId = updatedGame.GenreId.Value;

        if (updatedGame.Price.HasValue)
            game.Price = updatedGame.Price.Value;

        if (updatedGame.ReleaseDate.HasValue)
            game.ReleaseDate = updatedGame.ReleaseDate.Value;

        if (updatedGame.ImageUrl is not null)
            game.ImageUrl = updatedGame.ImageUrl;

        if (updatedGame.Description is not null)
            game.Description = updatedGame.Description;

        if (updatedGame.Publisher is not null)
            game.Publisher = updatedGame.Publisher;

        game.UpdatedAt = DateTime.UtcNow;
    }

    public static GameSummaryDto ToGameSummaryDto(this Game game)
    {
        return new(
                game.Id,
                game.Name,
                game.Genre!.Name,
                game.Price,
                game.ReleaseDate,
                game.ImageUrl,
                game.Description,
                game.Publisher,
                game.CreatedAt,
                game.UpdatedAt
            );
    }

    public static GameDetailsDto ToGameDetailsDto(this Game game)
    {
        return new(
                game.Id,
                game.Name,
                game.GenreId,
                game.Price,
                game.ReleaseDate,
                game.ImageUrl,
                game.Description,
                game.Publisher,
                game.CreatedAt,
                game.UpdatedAt
            );
    }

}
