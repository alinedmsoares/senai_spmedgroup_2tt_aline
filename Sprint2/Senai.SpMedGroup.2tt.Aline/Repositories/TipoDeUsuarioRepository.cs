using Senai.SpMedGroup.WebApi.Aline.Domains;
using Senai.SpMedGroup.WebApi.Aline.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedGroup.WebApi.Aline.Repositories
{
    public class TipoDeUsuarioRepository : ITipoDeUsuarioRepository
    {
        public List<TipoDeUsuario> ListarTiposUsuarios()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.TipoDeUsuario.ToList();
            }
        }
    }
}
