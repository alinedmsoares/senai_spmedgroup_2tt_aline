using Senai.SpMedGroup.WebApi.Aline.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedGroup.WebApi.Aline.Interfaces
{
    public interface IMedicoRepository
    {
        List<Medicos> ListarMedicos();

        void CadastrarMedico(Medicos medicos);

        Medicos BuscarPorId(int id);

        void Deletar(int id);
    }
}
