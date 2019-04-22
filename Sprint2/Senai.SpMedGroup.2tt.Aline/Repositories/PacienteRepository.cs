using Microsoft.EntityFrameworkCore;
using Senai.SpMedGroup.WebApi.Aline.Domains;
using Senai.SpMedGroup.WebApi.Aline.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedGroup.WebApi.Aline.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        public Prontuario BuscarPorId(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Prontuario.Find(id);
            }
        }

        public void CadastrarPaciente(Prontuario prontuario)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Prontuario.Add(prontuario);
                ctx.SaveChanges();
            }
        }

        public void Deletar(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                Prontuario protnuarioProcurado = BuscarPorId(id);
                ctx.Prontuario.Remove(protnuarioProcurado);
                ctx.SaveChanges();
            }
        }

        public List<Prontuario> ListarPacientes()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Prontuario.Include(x => x.IdUsuarioNavigation).ToList();
            }
        }
    }
}
