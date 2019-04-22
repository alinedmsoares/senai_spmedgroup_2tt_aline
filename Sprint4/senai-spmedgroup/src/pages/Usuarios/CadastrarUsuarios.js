import React, { Component } from "react";
import axios from 'axios';
import apiService from "../../services/apiService";

class CadastrarUsuarios extends Component {
    constructor() {
        super();

        this.state = {
            listaUsuarios: [],
            listaTiposUsuarios : [],
            email : " ",
            senha : " ",
            idTipoDeUsuarioNavigation : " "
        };
    }
    buscarUsuarios()
    {
        let jwt = localStorage.getItem('usuario-spmedgroup');
        
        axios.get(`http://localhost:5000/api/usuarios`,{
            headers:{
                "authorization": 'Bearer ' + jwt
            }
        })
        .then(res => {
            const usuarios = res.data;
            this.setState({listaUsuarios : usuarios})
        })
    }
    buscarTiposUsuarios(){
        let jwt = localStorage.getItem('usuario-spmedgroup');
        axios.get(`http://localhost:5000/api/tiposdeusuarios`,{
            headers:{
                "authorization": 'Bearer ' + jwt
            }})
        .then(res => {
            const tiposdeusuarios = res.data;
            this.setState({idTipoDeUsuarioNavigation : tiposdeusuarios})
        })
    }

    atualizarEstadoEmail(event){
        this.setState({email : event.target.value});
    }
    atualizarEstadoSenha(event){
        this.setState({senha : event.target.value});
    }
    atualizarEstadoTipoUsuario(event){
        this.setState({idTipoDeUsuarioNavigation : event.target.value});
    }

    cadastrarUsuario(event){
        event.preventDefault();

        let usuario = {
            email : this.state.email,
            senha : this.state.senha,
            idTipoDeUsuario1 : this.state.idTipoDeUsuarioNavigation
          };
          let jwt = localStorage.getItem('usuario-spmedgroup');
          axios.post(`http://localhost:5000/api/usuarios`,{
              headers:{
                  "authorization": 'Bearer ' + jwt
              }})
        console.log(usuario)
        .then(res => {
            this.buscarUsuarios()
        })
    }
    componentDidMount(){
        this.buscarUsuarios();
        this.buscarTiposUsuarios();
    }
    render(){
        return(
            <div>
                <form onSubmit={this.cadastrarUsuario.bind(this)} noValidate>
                <input
                    type="text"
                    value={this.state.email}
                    onChange={this.atualizarEstadoEmail.bind(this)}
                    placeholder="Email do usuário"
                />
                <input
                    type="text"
                    value={this.state.senha}
                    onChange={this.atualizarEstadoSenha.bind(this)}
                    placeholder="Senha do usuário"
                />
                <select
                    value={this.state.idTipoDeUsuarioNavigation}
                    onChange={this.atualizarEstadoTipoUsuario.bind(this)} required>
                <option>Selecione o tipo de usuário</option>
                {this.state.listaTiposUsuarios.map(element => {
                    return (
                        <option key={element.id} value={element.id}>
                            {element.tipoDeUsuario1}
                        </option>
                    );
                })}
                </select>

            <button onClick={this.cadastrarUsuario.bind(this)}>
                Cadastrar
                </button>
                </form >
            </div>
        )
    }
    
}
export default CadastrarUsuarios;
