using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedGroup.WebApi.Aline.Domains
{
    public partial class Prontuario
    {
        public Prontuario()
        {
            Consulta = new HashSet<Consulta>();
        }
        public int Id { get; set; }
        [Required(ErrorMessage = "Informe o nome do paciente")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "Informe a data de nascimento do paciente")]
        public DateTime DataDeNascimento { get; set; }
        [Required(ErrorMessage = "Informe o telefone do paciente")]
        public string Telefone { get; set; }
        [Required(ErrorMessage = "Informe o RG do paciente")]
        [StringLength(9, MinimumLength = 7, ErrorMessage = "Informe o RG sem pontos e traços")]
        public string Rg { get; set; }
        [Required(ErrorMessage = "Informe o CPF paciente")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "Informe o CPF sem pontos e traços")]
        public string Cpf { get; set; }
        [Required(ErrorMessage = "Informe o endereço do paciente")]
        public string Endereco { get; set; }
        [Required(ErrorMessage = "Informe o Id do Usuário")]
        public int IdUsuario { get; set; }

        public Usuario IdUsuarioNavigation { get; set; }
        public ICollection<Consulta> Consulta { get; set; }
    }
}
