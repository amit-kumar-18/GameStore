using GameStore.Api.Data;
using GameStore.Api.Endpoints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Logging
builder.Logging.AddProvider(new OnlyAppLoggerProvider());
builder.Logging.AddFilter("GameStore", LogLevel.None);
builder.Logging.AddFilter<OnlyAppLoggerProvider>("GameStore", LogLevel.Information);

var connString = builder.Configuration.GetConnectionString("GameStore");
builder.Services.AddSqlite<GameStoreContext>(connString);

var app = builder.Build();

app.UseStaticFiles();
app.MapGamesEndpoints();
app.MapGenresEndpoints();

await app.MigrateDbAsync();
app.Run();
