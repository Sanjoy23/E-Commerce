using System.ComponentModel.DataAnnotations;

namespace WebApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength =4, ErrorMessage ="You must specify between 4 to 8")]
        public string Password { get; set; }
    }
}
