namespace GameStore.Api.Dtos;

public record UpdateGameDto(
    string Name,
     int? GenreId,
     decimal? Price,
     DateOnly? ReleaseDate,
     string? Description,
     string? Publisher,
     IFormFile? Image
);
