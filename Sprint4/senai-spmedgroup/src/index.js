import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Login/App';
import CadastrarConsulta from './pages/Consulta/CadastrarConsulta'
import NaoEncontrado from './pages/NaoEncontrado/naoencontrado'
import ListarConsulta from './pages/Consulta/ListarConsulta'
import ListarUsuarios from './pages/Usuarios/ListarUsuarios'
import ListarMedicos from './pages/Medicos/ListarMedicos'
import ListarConsultaPaciente from './pages/MinhasConsultas/consultas'
import ListarConsultaMedico from './pages/ConsultasAgendadas/consultas'
import ListarProntuario from './pages/Prontuario/ListarProntuario'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import { usuarioAutenticado, parseJwt } from './services/auth';

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
                <PermissaoAdmin path="/Consulta/cadastrar" component={CadastrarConsulta} />
                <PermissaoAdmin path="/Consulta/listar" component={ListarConsulta} />
                <PermissaoAdmin path="/Prontuario/listar" component={ListarProntuario} />
                <PermissaoAdmin path="/Usuarios/listar" component={ListarUsuarios} />
                <PermissaoAdmin path="/Medicos/listar" component={ListarMedicos} />
                <PermissaoPaciente path="/Consulta/minhas" component={ListarConsultaPaciente} />
                <PermissaoMedico path="/consulta/agendadas" component={ListarConsultaMedico} />
                <Route component={NaoEncontrado} />
            </Switch>
        </div>
    </Router>
);
ReactDOM.render(rotas, document.getElementById('root'));


serviceWorker.unregister();
