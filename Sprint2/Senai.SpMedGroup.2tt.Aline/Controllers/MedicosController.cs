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
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository MedicoRepository {get;set;}

        public MedicosController()
        {
            MedicoRepository = new MedicoRepository();
        }
        //Listando todos os médicos
        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult ListarMedicos()
        {
            try
            {
                return Ok(MedicoRepository.ListarMedicos());
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult CadastrarMedico(Medicos medico)
        {
            try
            {
                MedicoRepository.CadastrarMedico(medico);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Medicos medicosProcurados = MedicoRepository.BuscarPorId(id);
                if (medicosProcurados == null)
                {
                    return NotFound();
                }
                MedicoRepository.Deletar(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex });
            }
        }
    }
}