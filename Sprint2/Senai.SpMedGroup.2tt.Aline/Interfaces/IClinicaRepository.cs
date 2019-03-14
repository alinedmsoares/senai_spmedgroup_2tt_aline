using Senai.SpMedGroup.WebApi.Aline.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedGroup.WebApi.Aline.Interfaces
{
    public interface IClinicaRepository
    {
        void CadastrarClinica(Clinica clinica);

        List<Clinica> ListarClinicas();

        Clinica BuscarPorId(int id);

        void Deletar(int id);
    }
}
