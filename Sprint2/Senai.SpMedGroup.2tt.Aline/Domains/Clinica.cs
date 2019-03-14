using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedGroup.WebApi.Aline.Domains
{
    public partial class Clinica
    {
        public Clinica()
        {
            Medicos = new HashSet<Medicos>();
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "Informe o Nome Fantasia")]
        public string NomeFantasia { get; set; }
        [Required(ErrorMessage = "Informe o CNPJ")]
        public string Cnpj { get; set; }
        [Required(ErrorMessage = "Informe a Razão Social")]
        public string RazaoSocial { get; set; }
        [Required(ErrorMessage = "Informe o Endereço")]
        public string Endereco { get; set; }
        [Required(ErrorMessage = "Informe o Horário de Funcionamento")]
        public string HorarioFuncionamento { get; set; }

        public ICollection<Medicos> Medicos { get; set; }
    }
}
