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
        group.MapPost("/", async ([FromForm] CreateGameWithImageDto dto, GameStoreContext dbContext) =>
        {
            string? imageUrl = null;

            if (dto.Image is not null)
            {
                var (url, error) = await FileHelpers.SaveImageAsync(dto.Image);
                if (error is not null)
                    return error;

                imageUrl = url;
            }

            var game = dto.ToEntity(imageUrl);

            dbContext.Games.Add(game);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute(
                GetGameEndpointName,
                new { id = game.Id },
                game.ToGameDetailsDto()
            );
        }).DisableAntiforgery();

        // PUT /games/{id}
        group.MapPut("/{id}", async (int id, [FromForm] UpdateGameWithImageDto dto, GameStoreContext dbContext) =>
        {
            var existingGame = await dbContext.Games.FindAsync(id);
            if (existingGame is null) return Results.NotFound();

            string? imageUrl = null;

            if (dto.Image is not null)
            {
                FileHelpers.DeleteImage(existingGame.ImageUrl);

                var (url, error) = await FileHelpers.SaveImageAsync(dto.Image);
                if (error is not null)
                    return error;

                imageUrl = url;
            }

            existingGame.UpdateEntity(dto, imageUrl);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        }).DisableAntiforgery();

        // DELETE /games/id
        group.MapDelete("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            var game = await dbContext.Games.FindAsync(id);
            if (game is null) return Results.NotFound();

            FileHelpers.DeleteImage(game.ImageUrl); // 🔥 Clean and reusable

            dbContext.Games.Remove(game);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });


        return group;
    }
}
