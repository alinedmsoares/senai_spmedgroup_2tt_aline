using Microsoft.EntityFrameworkCore;
using Senai.SpMedGroup.WebApi.Aline.Domains;
using Senai.SpMedGroup.WebApi.Aline.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedGroup.WebApi.Aline.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        public Medicos BuscarPorId(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Medicos.Find(id);
            }
        }

        public void CadastrarMedico(Medicos medicos)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Medicos.Add(medicos);
                ctx.SaveChanges();
            }
        }

        public void Deletar(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                Medicos medicosProcurados = BuscarPorId(id);
                ctx.Medicos.Remove(medicosProcurados);
                ctx.SaveChanges();
            }
        }

        public List<Medicos> ListarMedicos()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                List<Medicos> listaMedicos = ctx.Medicos.Include(x => x.IdClinicaNavigation).Include(x => x.IdUsuarioNavigation).ToList();


                foreach (var item in listaMedicos)
                {
                    item.IdClinicaNavigation.Medicos = null;
                    item.IdUsuarioNavigation.Medicos = null;
                }

                return listaMedicos;
            }
        }
    }
}
