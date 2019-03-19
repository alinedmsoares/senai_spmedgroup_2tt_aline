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
    public class PacientesController : ControllerBase
    {
        private IPacienteRepository PacienteRepository { get; set; }

            public PacientesController()
        {
            PacienteRepository = new PacienteRepository();
        }
        //Listando todos os pacientes
        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public IActionResult ListarPacientes()
        {
            try
            {
                return Ok(PacienteRepository.ListarPacientes());
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult CadastrarPaciente(Prontuario prontuario)
        {
            try
            {
                PacienteRepository.CadastrarPaciente(prontuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Prontuario prontuario = PacienteRepository.BuscarPorId(id);
                if (prontuario == null)
                {
                    return NotFound();
                }
                PacienteRepository.Deletar(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex });
            }
        }
    }
}