using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Reflection.Metadata.Ecma335;

public class OnlyAppLogger : ILogger
{
    private readonly string _categoryName;
    private static readonly object _lock = new();

    public OnlyAppLogger(string categoryName)
    {
        _categoryName = categoryName;
    }

    IDisposable? ILogger.BeginScope<TState>(TState state)
    {
        return null;
    }

    public bool IsEnabled(LogLevel logLevel) => true;

    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel)) return;

        var message = formatter(state, exception);
        var timestamp = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fffzzz");
        var logLine = $"{timestamp}\t[{logLevel}]\t{message}";

        var logFilePath = Path.Combine("Logs", $"gamestore-{DateTime.Now:dd-MM-yy}.log");
        Directory.CreateDirectory(Path.GetDirectoryName(logFilePath)!);

        lock (_lock)
        {
            File.AppendAllText(logFilePath, logLine + Environment.NewLine);
        }
    }

}
