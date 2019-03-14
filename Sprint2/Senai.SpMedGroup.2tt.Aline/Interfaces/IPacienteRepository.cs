using Senai.SpMedGroup.WebApi.Aline.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedGroup.WebApi.Aline.Interfaces
{
    public interface IPacienteRepository
    {
        List<Prontuario> ListarPacientes();

        void CadastrarPaciente(Prontuario prontuario);

        Prontuario BuscarPorId(int id);

        void Deletar(int id);
    }
}
