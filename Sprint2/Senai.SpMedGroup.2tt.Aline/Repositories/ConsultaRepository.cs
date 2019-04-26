using Microsoft.EntityFrameworkCore;
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
                List<Consulta> listaConsultas = ctx.Consulta.Include(x => x.IdProntuarioNavigation).Include(x => x.IdMedicoNavigation).Include(x => x.IdSituacaoNavigation).ToList();
                

                foreach (var item in listaConsultas)
                {
                    item.IdMedicoNavigation.Consulta = null;
                    item.IdProntuarioNavigation.Consulta = null;
                    item.IdSituacaoNavigation.Consulta = null;
                }

                return listaConsultas;
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
                List<Consulta> listaConsultaMedico = ctx.Consulta.Include(x => x.IdMedicoNavigation).Include(x => x.IdProntuarioNavigation).Include(x => x.IdSituacaoNavigation).Where(x => x.IdMedico == medico.Id).ToList();

                foreach (var item in listaConsultaMedico)
                {
                    item.IdProntuarioNavigation.Consulta = null;
                    item.IdSituacaoNavigation.Consulta = null;
                }

                return listaConsultaMedico;
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
                List<Consulta> listaConsultaPaciente = ctx.Consulta.Include(x => x.IdProntuarioNavigation).Include(x => x.IdMedicoNavigation).Include(x => x.IdSituacaoNavigation).Where(x => x.IdProntuario == paciente.Id).ToList();

                foreach (var item in listaConsultaPaciente)
                {
                    item.IdMedicoNavigation.Consulta = null;
                    item.IdSituacaoNavigation.Consulta = null;
                }

                return listaConsultaPaciente;

            }
        }
    }


    }



