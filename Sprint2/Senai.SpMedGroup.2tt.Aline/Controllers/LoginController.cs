using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.SpMedGroup.WebApi.Aline.Domains;
using Senai.SpMedGroup.WebApi.Aline.Interfaces;
using Senai.SpMedGroup.WebApi.Aline.Repositories;
using Senai.SpMedGroup.WebApi.Aline.ViewModels;

namespace Senai.SpMedGroup.WebApi.Aline.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository UsuarioRepository { get; set; }

        public LoginController()
        {
            UsuarioRepository = new UsuarioRepository();
        }
        //Realizando login
        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Usuario usuario = UsuarioRepository.BuscarPorEmailSenha(login.Email, login.Senha);
                if (usuario == null)
                {
                    return NotFound(
                        new
                        {
                            mensagem = "Usuário não encontrado!"
                        });
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, usuario.Id.ToString()),
                    new Claim(ClaimTypes.Role, usuario.IdTipoDeUsuarioNavigation.TipoDeUsuario1.ToString())
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("SpMedGroup-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "SpMedGroup.WebApi",
                    audience: "SpMedGroup.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (Exception ex)
            {

                return BadRequest(new
                {
                    mensagem = ex
                });
            }

        }
    }
}