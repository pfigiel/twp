using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using TWP.Backend.Api.Middleware;
using TWP.Backend.Infrastructure;
using TWP.Backend.Infrastructure.Configurations;
using TWP.Backend.Infrastructure.Database;
using TWP.Backend.Infrastructure.Providers;
using TWP.Backend.Infrastructure.Repositories;

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

            services.Configure<IdentityConfiguration>(Configuration.GetSection("Identity"));

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TWP API", Version = "v1" });
                c.AddSecurityDefinition(
                    "Bearer",
                    new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Description = "Enter into field the word 'Bearer' following by space and JWT.",
                        Name = "Authorization",
                        Type = SecuritySchemeType.ApiKey,
                    });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer",
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    },
                });
            });

            services.AddApiDependencies(Configuration);
            services.AddInfrastructureDependencies(Configuration);

            services.AddCors(setupAction => setupAction.AddPolicy(_developmentCorsPolicy, options =>
                options.WithOrigins(configuration.ClientApp.Origin).AllowAnyMethod().AllowAnyHeader()));

            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(configuration.Database.ConnectionString));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
                        var cancellationTokenProvider = context.HttpContext.RequestServices.GetRequiredService<ICancellationTokenProvider>();
                        var userId = int.Parse(context.Principal.Identity.Name);
                        var user = await userService.GetByIdAsync(userId, cancellationTokenProvider.GetCancellationToken());

                        if (user == null)
                        {
                            context.Fail("Unauthorized");
                        }
                    },
                };
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration.Identity.Secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
            });
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

            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
