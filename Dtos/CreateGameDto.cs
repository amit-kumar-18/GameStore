namespace GameStore.Api.Dtos;

public record CreateGameDto(
     string Name,
     int GenreId,
     decimal Price,
     DateOnly ReleaseDate,
     string? Description,
     string? Publisher,
     IFormFile? Image
);
