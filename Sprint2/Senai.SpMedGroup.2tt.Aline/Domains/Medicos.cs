using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedGroup.WebApi.Aline.Domains
{
    public partial class Medicos
    {
        public Medicos()
        {
            Consulta = new HashSet<Consulta>();
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "Informe o nome do médico")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "Informe o CRM")]
        [StringLength(5, MinimumLength = 5, ErrorMessage = "Informe o CRM sem pontos e traços")]
        public string Crm { get; set; }
        [Required(ErrorMessage = "Informe o Id da Especialidade")]
        public int IdEspecialidade { get; set; }
        [Required(ErrorMessage = "Informe o Id da Clínica")]
        public int IdClinica { get; set; }
        [Required(ErrorMessage = "Informe o Id do Usuário")]
        public int IdUsuario { get; set; }

        public Clinica IdClinicaNavigation { get; set; }
        public Especialidades IdEspecialidadeNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
        public ICollection<Consulta> Consulta { get; set; }
    }
}
