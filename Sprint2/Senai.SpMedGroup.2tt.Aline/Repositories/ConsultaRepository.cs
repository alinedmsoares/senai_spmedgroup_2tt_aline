using Senai.SpMedGroup.WebApi.Aline.Domains;
using Senai.SpMedGroup.WebApi.Aline.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedGroup.WebApi.Aline.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        public Consulta BuscarPorId(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
            return ctx.Consulta.Find(id);
            }

        }

        public void CadastrarConsulta(Consulta consulta)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Consulta.Add(consulta);
                ctx.SaveChanges();
            }
        }

        public void CadastrarDescricao(Consulta consulta, int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {

                ctx.Consulta.Update(consulta);
                ctx.SaveChanges();
            }
        }

        public void CancelarConsulta(Consulta consulta, int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {

                ctx.Consulta.Update(consulta);
                ctx.SaveChanges();
            }
        }

        public void Deletar(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                Consulta consultaProcurada = BuscarPorId(id);
                ctx.Consulta.Remove(consultaProcurada);
                ctx.SaveChanges();
            }
        }

        public List<Consulta> ListarConsultas()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Consulta.ToList();
            }
        }

        public List<Consulta> ListarConsultasMedicos(int idUsuario)
        {
            Medicos medico;
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                medico = ctx.Medicos.FirstOrDefault(x => x.IdUsuario == idUsuario);

            }
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Consulta.Where(x => x.IdMedico == medico.Id).ToList();
            }
        }

        public List<Consulta> ListarConsultasPaciente(int idUsuario)
        {
            Prontuario paciente;
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                paciente = ctx.Prontuario.FirstOrDefault(x => x.IdUsuario == idUsuario);
                
            }
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Consulta.Where(x => x.IdProntuario == paciente.Id).ToList();
            }
        }
    }

        //public List<Consulta> ListarConsultasDeUmUsuario(int idUsuario)
        //{
        //    Prontuario paciente;
        //    Medicos medico = new Medicos();
        //    Usuario usuario = new Usuario();

        //    if (IdTipoDeUsuario == 2)
        //    {
        //    using (SpMedGroupContext ctx = new SpMedGroupContext())
        //    {
        //        medico = ctx.Medicos.FirstOrDefault(x => x.IdUsuario == idUsuario);
        //        return ctx.Consulta.Where(x => x.IdMedico == medico.Id).ToList();
        //    }
        //    }
        //    else
        //    {
//            using (spmedgroupcontext ctx = new spmedgroupcontext())
//            {
//                paciente = ctx.prontuario.firstordefault(x => x.idusuario == idusuario);
//                return ctx.consulta.where(x => x.idprontuario == paciente.id).tolist();
//}
//            }
        //    }

    }



