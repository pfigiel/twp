using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TWP.Backend.Infrastructure.Configurations;
using TWP.Backend.Infrastructure.Repositories;

namespace TWP.Backend.Api.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IdentityConfiguration _identityConfiguration;

        public JwtMiddleware(RequestDelegate next, IOptions<IdentityConfiguration> identityConfiguration)
        {
            _next = next;
            _identityConfiguration = identityConfiguration.Value;
        }

        public async Task Invoke(HttpContext context, IUserRepository userRepository)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                await AttachUserToContext(context, userRepository, token);
            }

            await _next(context);
        }

        private async Task AttachUserToContext(HttpContext context, IUserRepository userRepository, string token)
        {
            try
            {
                var key = Encoding.ASCII.GetBytes(_identityConfiguration.Secret);

                var tokenHandler = new JwtSecurityTokenHandler();
                tokenHandler.ValidateToken(
                    token,
                    new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero,
                    },
                    out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                context.Items["User"] = await userRepository.GetByIdAsync(userId, CancellationToken.None);
            }
            catch
            {
            }
        }
    }
}
