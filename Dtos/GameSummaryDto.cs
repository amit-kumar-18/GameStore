namespace GameStore.Api.Dtos;

public record class GameSummaryDto(
    int Id,
    string Name,
    string Genre,
    decimal Price,
    DateOnly ReleaseDate,
    string? ImageUrl,
    string? Description,
    string? Publisher,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);
