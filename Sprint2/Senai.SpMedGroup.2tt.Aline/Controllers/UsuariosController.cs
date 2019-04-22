using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.SpMedGroup.WebApi.Aline.Domains;
using Senai.SpMedGroup.WebApi.Aline.Interfaces;
using Senai.SpMedGroup.WebApi.Aline.Repositories;

namespace Senai.SpMedGroup.WebApi.Aline.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository UsuarioRepository { get; set; }

        public UsuariosController()
        {
            UsuarioRepository = new UsuarioRepository();
        }
        //Cadastrando um novo usuário
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult Cadastrar(Usuario usuario)
        {
            try
            {
                UsuarioRepository.Cadastrar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex});
            }
        }
        //Listando todos os usuários
        [Authorize]
        [HttpGet]
        public IActionResult ListarUsuarios()
        {
            try
            {
                return Ok(UsuarioRepository.ListarUsuarios());
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
    }
}