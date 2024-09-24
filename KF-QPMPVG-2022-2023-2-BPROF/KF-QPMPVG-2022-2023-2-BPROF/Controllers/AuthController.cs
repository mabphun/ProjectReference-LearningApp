using KF_QPMPVG_2022_2023_2_BPROF.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace KF_QPMPVG_2022_2023_2_BPROF.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public AuthController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var claim = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
                };
                foreach (var role in await _userManager.GetRolesAsync(user))
                {
                    claim.Add(new Claim(ClaimTypes.Role, role));
                }
                var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("nagyonhosszutitkoskodhelye"));
                var token = new JwtSecurityToken(
                 issuer: "http://www.security.org", audience: "http://www.security.org",
                 claims: claim, expires: DateTime.Now.AddMinutes(60),
                 signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
                );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    id = user.Id
                });
            }
            return Unauthorized();
        }

        [HttpPut]
        public async Task<IActionResult> InsertUser([FromBody] RegisterViewModel model)
        {
            var user = new AppUser
            {
                Email = model.Email,
                UserName = model.UserName,
                SecurityStamp = Guid.NewGuid().ToString(),
                Image = model.Image
            };
            await _userManager.CreateAsync(user, model.Password);
            //await _userManager.AddToRoleAsync(user, "User");
            return Ok();
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> Google([FromBody] SocialToken token)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://oauth2.googleapis.com");
            client.DefaultRequestHeaders.Accept.Add(
              new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            var response = await client.GetAsync($"tokeninfo?id_token={token.Token}");
            var result = await response.Content.ReadFromJsonAsync<GoogleModel>();

            if (result != null)
            {
                var email = result.email;
                var username = email.Split('@')[0];
                AppUser user = new AppUser
                {
                    
                    Email = result.email,
                    UserName = username,
                    Image = token.Image
                };
                return await SocialAuth(user);
            }
            return Unauthorized();
        }

        private async Task<IActionResult> SocialAuth(AppUser user)
        {
            if (_userManager.Users.FirstOrDefault(t => t.Email == user.Email) == null)
            {
                var res = await _userManager.CreateAsync(user);
                if (res.Succeeded)
                {
                    //await _userManager.AddToRoleAsync(user, "Customer");
                }
            }
            var appuser = _userManager.Users.FirstOrDefault(t => t.Email == user.Email);
            if (appuser != null)
            {
                var claim = new List<Claim> {
                    new Claim(JwtRegisteredClaimNames.Sub, appuser.UserName),
                    new Claim(JwtRegisteredClaimNames.NameId, appuser.UserName),
                    new Claim(JwtRegisteredClaimNames.Name, appuser.UserName)
                };

                foreach (var role in await _userManager.GetRolesAsync(appuser))
                {
                    claim.Add(new Claim(ClaimTypes.Role, role));
                }
                var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes
                    ("nagyonhosszutitkoskodhelye"));
                        var token = new JwtSecurityToken(
                         issuer: "http://www.security.org", audience: "http://www.security.org",
                         claims: claim, expires: DateTime.Now.AddMinutes(60),
                         signingCredentials: new SigningCredentials
                    (signinKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    id = appuser.Id
                });
            }
            return Unauthorized();
        }

        

        public class SocialToken
        {
            public string Token { get; set; }
            public string Image { get; set; }
        }

        public class GoogleModel
        {
            public string iss { get; set; }
            public string azp { get; set; }
            public string aud { get; set; }
            public string sub { get; set; }
            public string email { get; set; }
            public string email_verified { get; set; }
            public string at_hash { get; set; }
            public string name { get; set; }
            public string picture { get; set; }
            public string given_name { get; set; }
            public string family_name { get; set; }
            public string locale { get; set; }
            public string iat { get; set; }
            public string exp { get; set; }
            public string jti { get; set; }
            public string alg { get; set; }
            public string kid { get; set; }
            public string typ { get; set; }
        }

        public class FbModel
        {
            public string first_name { get; set; }
            public string last_name { get; set; }
            public Picture picture { get; set; }
            public string email { get; set; }
            public string id { get; set; }
            public class Picture
            {
                public PictureData data { get; set; }
                public class PictureData
                {
                    public int height { get; set; }
                    public bool is_silhouette { get; set; }
                    public string url { get; set; }
                    public int width { get; set; }
                }
            }
        }
    }
}
