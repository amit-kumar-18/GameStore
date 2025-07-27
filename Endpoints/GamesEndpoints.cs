using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Entities;
using GameStore.Api.Helper;
using GameStore.Api.Mapping;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndpointName = "GetGame";

    public static RouteGroupBuilder MapGamesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("games").WithParameterValidation();

        // GET /games
        group.MapGet("/", async (GameStoreContext dbContext) =>
            await dbContext.Games
                     .Include(game => game.Genre)
                     .Select(game => game.ToGameSummaryDto())
                     .AsNoTracking()
                     .ToListAsync()
        );

        // GET /games/id
        group.MapGet("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            Game? game = await dbContext.Games.FindAsync(id);

            return game is null ? Results.NotFound() : Results.Ok(game.ToGameDetailsDto());
        }).WithName(GetGameEndpointName);

        // POST /games
        group.MapPost("/", async (
            [FromForm] CreateGameWithImageDto dto,
            GameStoreContext dbContext,
            ILogger<Game> logger
            ) =>
        {
            logger.LogInformation("Creating Game: {Name}", dto.Name);
            string? imageUrl = null;

            if (dto.Image is not null)
            {
                var (url, error) = await FileHelpers.SaveImageAsync(dto.Image, logger);
                if (error is not null)
                {
                    logger.LogWarning("Image upload failed for game: {Name}", dto.Name);
                    return error;
                }

                imageUrl = url;
            }

            var game = dto.ToEntity(imageUrl);
            dbContext.Games.Add(game);

            try
            {
                await dbContext.SaveChangesAsync();
                logger.LogInformation("Game created: {Name}", dto.Name);
            }
            catch (DbUpdateException error)
            {
                logger.LogError(error, "DB error while saving game: {Name}", dto.Name);
                return Results.Problem("A database error occurred. Please try again.");
            }

            return Results.CreatedAtRoute(
                GetGameEndpointName,
                new { id = game.Id },
                game.ToGameDetailsDto()
            );
        }).DisableAntiforgery();

        // PUT /games/{id}
        group.MapPut("/{id}", async (
            int id,
            [FromForm] UpdateGameWithImageDto dto,
            GameStoreContext dbContext,
            ILogger<Game> logger
            ) =>
        {
            logger.LogInformation("Updating game: {Name}", dto.Name);
            var existingGame = await dbContext.Games.FindAsync(id);
            if (existingGame is null) return Results.NotFound();

            string? imageUrl = null;

            if (dto.Image is not null)
            {
                FileHelpers.DeleteImage(existingGame.ImageUrl);

                var (url, error) = await FileHelpers.SaveImageAsync(dto.Image, logger);
                if (error is not null)
                {
                    logger.LogWarning("Image upload failed for game: {Name}", dto.Name);
                    return error;
                }

                imageUrl = url;
            }

            existingGame.UpdateEntity(dto, imageUrl);
            try
            {
                await dbContext.SaveChangesAsync();
                logger.LogInformation("Game updated: {Name}", dto.Name);
            }
            catch (DbUpdateException error)
            {
                logger.LogError(error, "DB error while updating game: {Name}", dto.Name);
                return Results.Problem("A database error occurred. Please try again.");
            }

            return Results.NoContent();
        }).DisableAntiforgery();

        // DELETE /games/id
        group.MapDelete("/{id}", async (
            int id,
            GameStoreContext dbContext,
            ILogger<Game> logger
            ) =>
        {
            logger.LogInformation("Deleting Game: {Id}", id);
            var game = await dbContext.Games.FindAsync(id);
            if (game is null) return Results.NotFound();

            FileHelpers.DeleteImage(game.ImageUrl);

            dbContext.Games.Remove(game);
            try
            {
                await dbContext.SaveChangesAsync();
                logger.LogInformation("Deleted Game: {Id}", id);

            }
            catch (DbUpdateException error)
            {
                logger.LogError(error, "DB error while deleting game: {Id}", id);
                return Results.Problem("A database error occurred. Please try again.");
            }

            return Results.NoContent();
        });

        return group;
    }
}
