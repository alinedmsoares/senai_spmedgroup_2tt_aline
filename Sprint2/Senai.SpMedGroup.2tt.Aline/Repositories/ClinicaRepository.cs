using Senai.SpMedGroup.WebApi.Aline.Domains;
using Senai.SpMedGroup.WebApi.Aline.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedGroup.WebApi.Aline.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        public Clinica BuscarPorId(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Clinica.Find(id);
            }
        }

        public void CadastrarClinica(Clinica clinica)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Clinica.Add(clinica);
                ctx.SaveChanges();
            }
        }

        public void Deletar(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                Clinica clinicaProcurada = BuscarPorId(id);
                ctx.Clinica.Remove(clinicaProcurada);
                ctx.SaveChanges();
            }
        }

        public List<Clinica> ListarClinicas()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Clinica.ToList();
            }
        }
    }
}
