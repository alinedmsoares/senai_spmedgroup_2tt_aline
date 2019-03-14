using Senai.SpMedGroup.WebApi.Aline.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedGroup.WebApi.Aline.Interfaces
{
    public interface IConsultaRepository
    {
        void CadastrarConsulta(Consulta consulta);
        List<Consulta> ListarConsultas();
        //List<Consulta> ListarConsultasDeUmUsuario(int idUsuario);
        void CancelarConsulta(Consulta consulta, int id);
        void CadastrarDescricao(Consulta consulta, int id);
        List<Consulta> ListarConsultasPaciente(int idUsuario);
        List<Consulta> ListarConsultasMedicos(int idUsuario);
        Consulta BuscarPorId(int id);
        void Deletar(int id);
    }
}
