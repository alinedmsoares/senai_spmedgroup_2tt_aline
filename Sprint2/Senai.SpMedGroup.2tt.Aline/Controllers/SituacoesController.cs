using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.SpMedGroup.WebApi.Aline.Interfaces;
using Senai.SpMedGroup.WebApi.Aline.Repositories;

namespace Senai.SpMedGroup.WebApi.Aline.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class SituacoesController : ControllerBase
    {
        private ISituacaoRepository SituacaoRepository { get; set; }
        public SituacoesController()
        {
            SituacaoRepository = new SituacaoRepository();
        }
        //Listando todas as situações
        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult ListarSituacao()
        {
            try
            {
                return Ok(SituacaoRepository.ListarSituacao());
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
    }
}