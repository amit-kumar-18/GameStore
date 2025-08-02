namespace GameStore.Api.Dtos;

public class UpdateGameDto
{
    public string Name { get; set; } = default!;
    public int GenreId { get; set; }
    public decimal Price { get; set; }
    public DateOnly ReleaseDate { get; set; } = default!;
    public string? Description { get; set; }
    public string? Publisher { get; set; }
    public IFormFile? Image { get; set; }
};
