using System.ComponentModel.DataAnnotations;

namespace TWP.Backend.Api.Commands.SignUp
{
    public class SignUpCommand : ICommand
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

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
