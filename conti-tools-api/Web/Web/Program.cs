using System.Reflection;
using Application;
using Application.Common.Settings;
using Infrastructure;
using Web.Filters;

var builder = WebApplication.CreateBuilder(args);
var originPolicy = "cors-policy";
var env = builder.Environment;

builder.Services.AddApplicationDependencies(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddSignalR();

//if (env.IsDevelopment())
if (true)
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(originPolicy, builder => builder.WithOrigins("http://localhost:3000","http://localhost:5000","http://10.0.0.149:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
    });
}


builder.Services.AddControllers(options => options.Filters.Add<ApiExceptionFilterAttribute>());

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Version = "v1",
        Title = "Auction Viewings API"
    });

    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder.Configuration.SetBasePath(env.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();

builder.Services.Configure<ConfigurationSettings>(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(originPolicy);
app.UseRouting();



app.UseAuthorization();

app.MapControllers();


app.Run();
