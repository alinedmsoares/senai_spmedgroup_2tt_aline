using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedGroup.WebApi.Aline.Domains
{
    public partial class TipoDeUsuario
    {
        public TipoDeUsuario()
        {
            Usuario = new HashSet<Usuario>();
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "Informe o tipo de usuário")]
        public string TipoDeUsuario1 { get; set; }

        public ICollection<Usuario> Usuario { get; set; }
    }
}