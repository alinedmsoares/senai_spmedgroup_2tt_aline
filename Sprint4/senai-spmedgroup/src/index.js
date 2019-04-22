import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Login/App';
import CadastrarConsulta from './pages/Consulta/CadastrarConsulta'
import ListarConsulta from './pages/Consulta/ListarConsulta'
import CadastrarUsuarios from './pages/Usuarios/CadastrarUsuarios'
import ListarUsuarios from './pages/Usuarios/ListarUsuarios'
import CadastrarProntuario from './pages/Prontuario/CadastrarProntuario'
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
                <PermissaoAdmin path="/Consulta/CadastrarConsulta" component={CadastrarConsulta} />
                <PermissaoAdmin path="/Consulta/ListarConsulta" component={ListarConsulta} />
                <PermissaoAdmin path="/Prontuario/CadastrarProntuario" component={CadastrarProntuario} />
                <PermissaoAdmin path="/Prontuario/ListarProntuario" component={ListarProntuario} />
                <PermissaoAdmin path="/Usuarios/CadastrarUsuarios" component={CadastrarUsuarios} />
                <PermissaoAdmin path="/Usuarios/ListarUsuarios" component={ListarUsuarios} />
                <PermissaoPaciente path="/MinhasConsultas/consultas" component={ListarConsultaPaciente} />
                <PermissaoMedico path="/ConsultasAgendadas/consultas" component={ListarConsultaMedico} />
            </Switch>
        </div>
    </Router>
);
ReactDOM.render(rotas, document.getElementById('root'));


serviceWorker.unregister();
