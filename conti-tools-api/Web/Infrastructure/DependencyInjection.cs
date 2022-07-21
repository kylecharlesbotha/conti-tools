using Application.Common.Interfaces;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        if (configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            services.AddDbContext<ContinentalToolsDbContext>(options =>
                options.UseInMemoryDatabase("TestCADb"));
        }
        else
        {
            services.AddDbContext<ContinentalToolsDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetValue<string>("ConnectionString"),
                    b => b.MigrationsAssembly(typeof(ContinentalToolsDbContext).Assembly.FullName)));
        }

        services.AddScoped<IContinentalToolsDbContext>(provider => provider.GetRequiredService<ContinentalToolsDbContext>());

        return services;
    }
}
