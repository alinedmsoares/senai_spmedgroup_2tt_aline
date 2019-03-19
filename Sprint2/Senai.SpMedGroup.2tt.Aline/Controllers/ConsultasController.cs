using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.SpMedGroup.WebApi.Aline.Domains;
using Senai.SpMedGroup.WebApi.Aline.Interfaces;
using Senai.SpMedGroup.WebApi.Aline.Repositories;
//Utilizar o Visual Studio para criação do novo projeto WebAPI
//Criar uma solução com a separação de pastas correta (domínio, repositório e controles) de acordo com a situação problema e seguindo as boas práticas
namespace Senai.SpMedGroup.WebApi.Aline.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository ConsultaRepository { get; set; }

        public ConsultasController()
        {
            ConsultaRepository = new ConsultaRepository();
        }
        //Cadastrando consultas
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult CadastrarConsulta(Consulta consulta)
        {
            try
            {
                ConsultaRepository.CadastrarConsulta(consulta);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        //Listando consultas
        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public IActionResult ListarConsultas()
        {
            try
            {
                return Ok(ConsultaRepository.ListarConsultas());
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
        //Listando consultas do paciente logado
        [Authorize(Roles = "Paciente")]
        [HttpGet("minhas")]
        public IActionResult MinhasConsultasPaciente()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(ConsultaRepository.ListarConsultasPaciente(idUsuario));
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = "Deu ruim!" });
            }
        }
        //Listando consultas do médico logado
        [Authorize(Roles = "Médico")]
        [HttpGet("agendadas")]
        public IActionResult MinhasConsultasMedico()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(ConsultaRepository.ListarConsultasMedicos(idUsuario));
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = "Deu ruim!" });
            }
        }
        //Cancelando consultas
        [Authorize(Roles = "Administrador")]
        [HttpPut("{id}")]
        public IActionResult CancelarConsulta(Consulta consulta, int id)
        {
            try
            {
                Consulta consultaProcurada = ConsultaRepository.BuscarPorId(id);
                if (consultaProcurada == null)
                {
                    return NotFound();
                }
                consultaProcurada = consulta;
                ConsultaRepository.CancelarConsulta(consultaProcurada, id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex });
            }
        }
        //Cadastrando descrição da consulta
        [Authorize(Roles = "Médico")]
        [HttpPut("descricao/{id}")]
        public IActionResult CadastrarDescricao(Consulta consulta, int id)
        {
            try
            {
                Consulta consultaProcurada = ConsultaRepository.BuscarPorId(id);
                if (consultaProcurada == null)
                {
                    return NotFound();
                }
                consultaProcurada.Descricao = consulta.Descricao;
                ConsultaRepository.CadastrarDescricao(consultaProcurada, id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex });
            }
        }
        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Consulta consultaProcurada = ConsultaRepository.BuscarPorId(id);
                if (consultaProcurada == null)
                {
                    return NotFound();
                }
                ConsultaRepository.Deletar(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex });
            }
        }
    }
}