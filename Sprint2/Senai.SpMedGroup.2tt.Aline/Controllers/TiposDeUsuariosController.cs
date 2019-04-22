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
    public class TiposDeUsuariosController : ControllerBase
    {
        private ITipoDeUsuarioRepository TipoDeUsuarioRepository { get; set; }

        public TiposDeUsuariosController()
        {
            TipoDeUsuarioRepository = new TipoDeUsuarioRepository();
        }
        [HttpGet]
        public IActionResult ListarTiposUsuarios()
        {
            try
            {
                return Ok(TipoDeUsuarioRepository.ListarTiposUsuarios());
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
    }
}