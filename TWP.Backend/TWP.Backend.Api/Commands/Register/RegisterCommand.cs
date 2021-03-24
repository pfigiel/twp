using System.ComponentModel.DataAnnotations;

namespace TWP.Backend.Api.Commands.Register
{
    public class RegisterCommand : ICommand
    {
        [Required]
        [MinLength(4)]
        [MaxLength(20)]
        public string Username { get; set; }

        [Required]
        [MinLength(8)]
        [MaxLength(32)]
        public string Password { get; set; }
    }
}
