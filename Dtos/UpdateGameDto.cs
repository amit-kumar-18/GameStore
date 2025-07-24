using System.ComponentModel.DataAnnotations;

namespace GameStore.Api.Dtos;

public record class UpdateGameDto(
    [Required][StringLength(50)] string? Name,
    int? GenreId,
    [Range(1, 500)] decimal? Price,
    DateOnly? ReleaseDate,
    string? ImageUrl,
    string? Description,
    string? Publisher
);