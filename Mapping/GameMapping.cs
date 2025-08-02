using GameStore.Api.Dtos;
using GameStore.Api.Entities;

namespace GameStore.Api.Mapping;

public static class GameMapping
{
    public static Game ToEntity(this CreateGameDto game, string? imageUrl)
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

    public static void UpdateEntity(this Game game, UpdateGameDto dto, string? imageUrl = null)
    {
        if (!string.IsNullOrWhiteSpace(dto.Name))
            game.Name = dto.Name;

        if (dto.GenreId is int genreId)
            game.GenreId = genreId;

        if (dto.Price is decimal price)
            game.Price = price;

        if (dto.ReleaseDate is DateOnly releaseDate)
            game.ReleaseDate = releaseDate;

        if (!string.IsNullOrWhiteSpace(dto.Description))
            game.Description = dto.Description;

        if (!string.IsNullOrWhiteSpace(dto.Publisher))
            game.Publisher = dto.Publisher;

        if (!string.IsNullOrWhiteSpace(imageUrl))
            game.ImageUrl = imageUrl;

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
