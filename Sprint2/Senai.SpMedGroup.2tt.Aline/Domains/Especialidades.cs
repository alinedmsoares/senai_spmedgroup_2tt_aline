using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedGroup.WebApi.Aline.Domains
{
    public partial class Especialidades
    {
        public Especialidades()
        {
            Medicos = new HashSet<Medicos>();
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "Informe o nome da especialidade")]
        public string Nome { get; set; }

        public ICollection<Medicos> Medicos { get; set; }
    }
}
