using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedGroup.WebApi.Aline.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Medicos = new HashSet<Medicos>();
            Prontuario = new HashSet<Prontuario>();
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "Informe o email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Informe a senha")]
        [StringLength(50, MinimumLength = 6, ErrorMessage = "Informe uma senha maior que 6 caracteres")]
        public string Senha { get; set; }
        [Required(ErrorMessage = "Informe o Id do Tipo de Usuário")]
        public int IdTipoDeUsuario { get; set; }

        public TipoDeUsuario IdTipoDeUsuarioNavigation { get; set; }
        public ICollection<Medicos> Medicos { get; set; }
        public ICollection<Prontuario> Prontuario { get; set; }
    }
}
