using Microsoft.AspNetCore;
using Microsoft.EntityFrameworkCore;
using WebApp.API.Data;
using WebApp.API.Models;

namespace WebApp.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host =  CreateWebHostBuilder(args).Build();
            using(var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<DataContext>();
                    context.Database.Migrate();
                    Seed.SeedUsers(context);
                }
                catch(Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred during migration");
                }
            }
            host.Run();
        }
        public static IWebHostBuilder CreateWebHostBuilder(string[]
            args) => WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}