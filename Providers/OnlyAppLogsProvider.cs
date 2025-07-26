
public class OnlyAppLoggerProvider : ILoggerProvider
{
    public ILogger CreateLogger(string categoryName)
    {
        return new OnlyAppLogger(categoryName);
    }

    public void Dispose() { }
}
