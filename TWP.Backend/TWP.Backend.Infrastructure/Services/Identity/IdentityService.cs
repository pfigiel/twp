using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TWP.Backend.Domain.Models;
using TWP.Backend.Infrastructure.Configurations;
using TWP.Backend.Infrastructure.Providers;
using TWP.Backend.Infrastructure.Repositories;

namespace TWP.Backend.Infrastructure.Services.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly IUserRepository _userRepository;
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly IDatabaseContextProvider _databaseContextProvider;
        private readonly IOptions<IdentityConfiguration> _identityOptions;

        public IdentityService(
            IUserRepository userRepository,
            IDateTimeProvider dateTimeProvider,
            IDatabaseContextProvider databaseContextProvider,
            IOptions<IdentityConfiguration> identityOptions)
        {
            _userRepository = userRepository;
            _dateTimeProvider = dateTimeProvider;
            _databaseContextProvider = databaseContextProvider;
            _identityOptions = identityOptions;
        }

        public async Task<UserEntity> AuthenticateAsync(string usernameOrEmail, string password, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUsernameOrEmailAsync(usernameOrEmail, cancellationToken);

            if (user == null)
            {
                throw new UnauthorizedAccessException($"User with username or email {usernameOrEmail} was not found.");
            }

            if (!IsPasswordHashValid(password, user.PasswordHash, user.PasswordSalt))
            {
                throw new InvalidOperationException("Generated password hash is invalid.");
            }

            return user;
        }

        public async Task<UserEntity> CreateUserAsync(UserEntity user, string password, CancellationToken cancellationToken)
        {
            if (await _userRepository.GetByEmailAsync(user.Email, cancellationToken) != null)
            {
                throw new ArgumentException($"Email address \"{user.Email}\" is already bound to an account.");
            }

            if (await _userRepository.GetByUsernameAsync(user.Username, cancellationToken) != null)
            {
                throw new ArgumentException($"Username \"{user.Username}\" is already taken.");
            }

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.CreatedAt = _dateTimeProvider.UtcNow;

            await _userRepository.AddAsync(user, cancellationToken);

            return user;
        }

        public async Task<RefreshTokenServiceResponse> RefreshTokenAsync(string token, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByRefreshTokenAsync(token, cancellationToken);

            if (user == null)
            {
                throw new ArgumentException("Failed to find a user associated with the provided refresh token.");
            }

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            if (!refreshToken.IsActive)
            {
                throw new UnauthorizedAccessException("Provided refresh token is expired.");
            }

            var newRefreshToken = GenerateRefreshToken();
            refreshToken.RevocationDate = DateTime.UtcNow;
            refreshToken.ReplacedByToken = newRefreshToken.Token;
            user.RefreshTokens.Add(newRefreshToken);
            _userRepository.Update(user);
            await _databaseContextProvider.SaveChangesAsync(cancellationToken);

            var jwtToken = GenerateJwtToken(user);

            return new RefreshTokenServiceResponse() { Token = jwtToken, RefreshToken = newRefreshToken.Token };
        }

        public async Task RevokeRefreshTokenAsync(string token, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByRefreshTokenAsync(token, cancellationToken);

            if (user == null)
            {
                return;
            }

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            if (!refreshToken.IsActive)
            {
                return;
            }

            refreshToken.RevocationDate = DateTime.UtcNow;
            _userRepository.Update(user);
        }

        public string GenerateJwtToken(UserEntity user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_identityOptions.Value.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddMinutes(_identityOptions.Value.AccessTokenLifetimeMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public RefreshTokenEntity GenerateRefreshToken()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[64];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            return new RefreshTokenEntity
            {
                Token = Convert.ToBase64String(randomBytes),
                ExpirationDate = DateTime.UtcNow.AddMinutes(_identityOptions.Value.RefreshTokenLifetimeMinutes),
                CreationDate = DateTime.UtcNow,
            };
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        private static bool IsPasswordHashValid(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (storedHash.Length != 64)
            {
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).");
            }

            if (storedSalt.Length != 128)
            {
                throw new ArgumentException("Invalid length of password salt (128 bytes expected).");
            }

            using (var hmac = new HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
