namespace GameStore.Api.Helper;

public static class FileHelpers
{
    public static async Task<(string? Url, IResult? Error)> SaveImageAsync(IFormFile file, ILogger logger)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        logger.LogInformation("Received file with extension: {Extension}", extension);

        if (!allowedExtensions.Contains(extension))
        {
            logger.LogWarning("Rejected file due to invalid extension: {Extension}", extension);
            return (null, Results.BadRequest("Invalid image format. Allowed: .jpg, .jpeg, .png, .webp"));
        }

        const long maxSize = 5 * 1024 * 1024;
        if (file.Length > maxSize)
        {
            logger.LogWarning("Rejected file due to size limit: {Size} bytes", file.Length);
            return (null, Results.BadRequest("File too large. Maximum allowed size is 5 MB."));
        }

        var fileName = $"{Guid.NewGuid()}{extension}";
        var relativePath = Path.Combine("images", fileName);
        var filePath = Path.Combine("wwwroot", relativePath);

        Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

        try
        {
            using var stream = new FileStream(filePath, FileMode.Create);
            logger.LogInformation("Saved file successfully: {FilePath}", filePath);
            await file.CopyToAsync(stream);

            return ($"/{relativePath.Replace("\\", "/")}", null);
        }
        catch (Exception error)
        {
            logger.LogError(error, "Failed to save image.");
            return (null, Results.Problem("Internal server error while saving the image."));
        }
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