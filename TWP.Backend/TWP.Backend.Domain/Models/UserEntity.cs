using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TWP.Backend.Domain.Models
{
    public class UserEntity : IEntity<long>
    {
        [Key]
        public long Id { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public bool IsActivated { get; set; }

        public DateTime CreatedAt { get; set; }

        [JsonIgnore]
        public ICollection<RefreshTokenEntity> RefreshTokens { get; set; }
    }
}
