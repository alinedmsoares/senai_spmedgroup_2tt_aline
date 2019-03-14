using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedGroup.WebApi.Aline.Domains
{
    public partial class Consulta
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Informe o Id do Prontuário")]
        public int IdProntuario { get; set; }
        [Required(ErrorMessage = "Informe o Id do médico")]
        public int IdMedico { get; set; }
        [Required(ErrorMessage = "Informe a data da consulta")]
        public DateTime DataConsulta { get; set; }
        [Required(ErrorMessage = "Informe a situação")]
        public int IdSituacao { get; set; }
        public string Descricao { get; set; }

        public Medicos IdMedicoNavigation { get; set; }
        public Prontuario IdProntuarioNavigation { get; set; }
        public Situacao IdSituacaoNavigation { get; set; }
    }
}
