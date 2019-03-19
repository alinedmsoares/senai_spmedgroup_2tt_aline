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
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository ClinicaRepository { get; set; }

        public ClinicasController()
        {
            ClinicaRepository = new ClinicaRepository();
        }
        //Listando todas as clínicas
        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public IActionResult ListarClinicas()
        {
            try
            {
                return Ok(ClinicaRepository.ListarClinicas());
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
        //Cadastrando clínicas
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult CadastrarClinica(Clinica clinica)
        {
            try
            {
                ClinicaRepository.CadastrarClinica(clinica);
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
                Clinica clinicaProcurada = ClinicaRepository.BuscarPorId(id);
                if (clinicaProcurada == null)
                {
                    return NotFound();
                }
                ClinicaRepository.Deletar(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex });
            }
        }
    }
}