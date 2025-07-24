namespace GameStore.Api.Dtos;

public record class GameDetailsDto(
    int Id,
    string Name,
    int GenreId,
    decimal Price,
    DateOnly ReleaseDate,
    string? ImageUrl,
    string? Description,
    string? Publisher,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);
