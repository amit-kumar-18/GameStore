using GameStore.Api.Data;
using GameStore.Api.Endpoints;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Logging
builder.Logging.AddProvider(new OnlyAppLoggerProvider());
builder.Logging.AddFilter("GameStore", LogLevel.None);
builder.Logging.AddFilter<OnlyAppLoggerProvider>("GameStore", LogLevel.Information);

// DB connection
var connString = builder.Configuration.GetConnectionString("GameStore");
builder.Services.AddSqlite<GameStoreContext>(connString);

var app = builder.Build();

// Global error handler
app.UseMiddleware<ErrorHandlingMiddleware>();

if (!app.Environment.IsDevelopment())
{
    var clientAppPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "browser");
    var fileProvider = new PhysicalFileProvider(clientAppPath);

    app.UseDefaultFiles(new DefaultFilesOptions
    {
        FileProvider = fileProvider,
        RequestPath = ""
    });

    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = fileProvider,
        RequestPath = ""
    });

    app.MapFallbackToFile("index.html", new StaticFileOptions
    {
        FileProvider = fileProvider
    });
}


app.MapGamesEndpoints();
app.MapGenresEndpoints();

await app.MigrateDbAsync();
app.Run();
