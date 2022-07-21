namespace Application.Common.Settings;

public class ConfigurationSettings
{
    public string ConnectionString { get; set; } = "";

    public bool UseInMemoryDatabase { get; set; }
}
