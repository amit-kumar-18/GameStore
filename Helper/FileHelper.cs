namespace GameStore.Api.Helper;

public static class FileHelpers
{
    public static async Task<(string? Url, IResult? Error)> SaveImageAsync(IFormFile file)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(extension))
            return (null, Results.BadRequest("Invalid image format."));

        var fileName = $"{Guid.NewGuid()}{extension}";
        var relativePath = Path.Combine("images", fileName);
        var filePath = Path.Combine("wwwroot", relativePath);

        Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return ($"/{relativePath.Replace("\\", "/")}", null);
    }

    public static void DeleteImage(string? imageUrl)
    {
        if (string.IsNullOrWhiteSpace(imageUrl)) return;

        var imagePath = Path.Combine("wwwroot", imageUrl.TrimStart('/'));
        if (File.Exists(imagePath))
        {
            File.Delete(imagePath);
        }
    }
}