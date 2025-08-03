using GameStore.Api.Data;
using GameStore.Api.Endpoints;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Logging Configuration
builder.Logging.AddProvider(new OnlyAppLoggerProvider());
builder.Logging.AddFilter("GameStore", LogLevel.None);
builder.Logging.AddFilter<OnlyAppLoggerProvider>("GameStore", LogLevel.Information);

// Database Configuration
var connString = builder.Configuration.GetConnectionString("GameStore");
builder.Services.AddSqlite<GameStoreContext>(connString);

var app = builder.Build();

// Global Error Middleware
app.UseMiddleware<ErrorHandlingMiddleware>();

// Serve static files from wwwroot/
app.UseStaticFiles();

// Production-specific: Serve Angular build from wwwroot/browser/
if (!app.Environment.IsDevelopment())
{
    var browserBuildPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "browser");
    var fileProvider = new PhysicalFileProvider(browserBuildPath);

    app.UseDefaultFiles(new DefaultFilesOptions
    {
        FileProvider = fileProvider
    });

    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = fileProvider
    });

    app.MapFallbackToFile("index.html", new StaticFileOptions
    {
        FileProvider = fileProvider
    });
}

// API Endpoints
app.MapGamesEndpoints();
app.MapGenresEndpoints();

// DB Migration and App Run
await app.MigrateDbAsync();
app.Run();
