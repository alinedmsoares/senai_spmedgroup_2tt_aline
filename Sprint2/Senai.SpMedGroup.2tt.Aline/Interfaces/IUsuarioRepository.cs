using Senai.SpMedGroup.WebApi.Aline.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedGroup.WebApi.Aline.Interfaces
{
    public interface IUsuarioRepository
    {
        Usuario BuscarPorEmailSenha(string email, string senha);

        void Cadastrar(Usuario usuario);

        List<Usuario> ListarUsuarios();

    }
}
