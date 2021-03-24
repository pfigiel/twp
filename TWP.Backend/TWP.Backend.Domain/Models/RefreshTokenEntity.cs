using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace TWP.Backend.Domain.Models
{
    [Owned]
    public class RefreshTokenEntity
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }

        public string Token { get; set; }

        public string ReplacedByToken { get; set; }

        public DateTime ExpirationDate { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime? RevocationDate { get; set; }

        public bool IsExpired => DateTime.UtcNow >= ExpirationDate;

        public bool IsActive => RevocationDate == null && !IsExpired;
    }
}
