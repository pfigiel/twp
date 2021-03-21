using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TWP.Backend.Api.Configurations;
using TWP.Backend.Infrastructure;
using TWP.Backend.Infrastructure.Database;

namespace TWP.Backend.Api
{
    public class Startup
    {
        private const string _developmentCorsPolicy = "DevelopmentCorsPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var configuration = new Configuration();
            Configuration.Bind(configuration);
            services.AddSingleton(configuration);

            services.AddControllers();

            services.AddSwaggerGen();

            services.AddApiDependencies(Configuration);
            services.AddInfrastructureDependencies(Configuration);

            services.AddCors(setupAction => setupAction.AddPolicy(_developmentCorsPolicy, options =>
                options.WithOrigins(configuration.ClientApp.Origin).AllowAnyMethod().AllowAnyHeader()));

            services.AddDbContext<DomainContext>(options => options.UseSqlServer(configuration.Database.ConnectionString));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseSwagger();

            app.UseSwaggerUI(setup =>
            {
                setup.SwaggerEndpoint("/swagger/v1/swagger.json", "TWP API v1");
                setup.RoutePrefix = string.Empty;
            });

            app.UseCors(_developmentCorsPolicy);

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
