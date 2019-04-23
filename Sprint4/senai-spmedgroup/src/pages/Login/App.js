import React, { Component } from 'react';
import logo from '../../assets/img/icon.png'
import imagemLogin from '../../assets/img/medicos.PNG';
import { Link } from "react-router-dom";
import Axios from "axios";
import '../../assets/css/reset.css';
import '../../assets/css/login.css';
import { parseJwt } from '../../services/auth';
import { parse } from 'path';



class App extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: ''
    }
  }
  atualizaEstadoEmail(event) {
    this.setState({ email: event.target.value });
  }

  atualizaEstadoSenha(event) {
    this.setState({ senha: event.target.value });
  }

  efetuaLogin(event) {
    event.preventDefault();

    Axios.post('http://localhost:5000/api/login', {
      email: this.state.email,
      senha: this.state.senha
    })
      .then(data => {
        if (data.status === 200) {
          console.log(data);
          localStorage.setItem("usuario-spmedgroup", data.data.token);
          console.log(parseJwt().Role);
          if (parseJwt().Role === "Administrador") {
            this.props.history.push("/consulta/cadastrarconsulta")
          }
          else if (parseJwt().Role === "Paciente") {
            this.props.history.push("/MinhasConsultas/consultas")
          }
          else {
            this.props.history.push("/ConsultasAgendadas/consultas")
          }
        }
      })
      .catch(erro => {
        console.log(erro);
      })
  }
  render() {
    return (
      <div className="App">
        <section className="app--container">
          <div className="app--header">
            <div className="app--logo">
              <img src={logo} alt="Logo representado por um S e um P" className="app--logo__img" />
              <div className="app--nome">
                <p className="app--nome__spmed">Sp Medical</p>
                <p className="app--nome__group">Group</p>
              </div>
            </div>
          </div>
          {/* campo de login */}
          <form onSubmit={this.efetuaLogin.bind(this)} className="app--form">
            <div className="app--login">
              <label for="inp" className="inp">
                <input
                  type="text"
                  value={this.state.email}
                  placeholder="&nbsp;"
                  onChange={this.atualizaEstadoEmail.bind(this)}
                  name="email"
                  id="inp"
                />
                <span class="label">Email</span>
                <span className="border"></span>
              </label>
              <label for="inp" class="inp">
                <input
                  type="password"
                  placeholder="&nbsp;"
                  value={this.state.senha}
                  onChange={this.atualizaEstadoSenha.bind(this)}
                  name="senha"
                  id="inp"
                />
                <span class="label">Senha</span>
                <span class="border"></span>
              </label>
              <div className="app--login__button">
                <button type="submit" className="app--btn__login">
                  Entrar
            </button>
              </div>
            </div>
          </form>
        </section>
        <div className="app--imagem">
          <img src={imagemLogin} alt="Médicos em um hospital conversando" className="app--imagem__medicos" />
        </div>
      </div>
    );
  }
}

export default App;

