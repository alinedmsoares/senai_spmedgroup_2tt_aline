import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Login/App';
import CadastrarConsulta from './pages/ConsultaAdmin/CadastrarConsultas'
import NaoEncontrado from './pages/NaoEncontrado/naoencontrado'
import ListarConsulta from './pages/ConsultaAdmin/ListarConsultas'
import ListarUsuarios from './pages/Usuarios/ListarUsuarios'
import ListarMedicos from './pages/Medicos/ListarMedicos'
import ListarClinica from './pages/Clinica/ListarClinica'
import ListarConsultaPaciente from './pages/ConsultaPaciente/ListarConsultas'
import ListarConsultaMedico from './pages/ConsultaMedico/ListarConsultas'
import ListarProntuario from './pages/Prontuario/ListarProntuario'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import { usuarioAutenticado, parseJwt } from './services/auth';
import Localizacoes from './pages/Localizacao/Localizacoes'
import * as serviceWorker from './serviceWorker';


const PermissaoAdmin = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
  const PermissaoMedico = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().Role === "Medico" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
  const PermissaoPaciente = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().Role === "Paciente" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );

const rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <PermissaoAdmin path="/consulta/cadastrar" component={CadastrarConsulta} />
                <PermissaoAdmin path="/consulta/listar" component={ListarConsulta} />
                <PermissaoAdmin path="/prontuario/listar" component={ListarProntuario} />
                <PermissaoAdmin path="/usuarios/listar" component={ListarUsuarios} />
                <PermissaoAdmin path="/medicos/listar" component={ListarMedicos} />
                <PermissaoPaciente path="/consulta/minhas" component={ListarConsultaPaciente} />
                <PermissaoMedico path="/consulta/agendadas" component={ListarConsultaMedico} />
                <PermissaoAdmin path="/clinica/listar" component={ListarClinica}/>
                <PermissaoAdmin path="/localizacoes" component={Localizacoes}/>
                <Route component={NaoEncontrado} />


            </Switch>
        </div>
    </Router>
);
ReactDOM.render(rotas, document.getElementById('root'));

serviceWorker.unregister();
