using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedGroup.WebApi.Aline.Domains
{
    public partial class Situacao
    {
        public Situacao()
        {
            Consulta = new HashSet<Consulta>();
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "Informe a situação")]
        public string Situacao1 { get; set; }

        public ICollection<Consulta> Consulta { get; set; }
    }
}
