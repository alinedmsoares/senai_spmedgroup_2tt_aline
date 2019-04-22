import React, { Component } from "react";
import axios from 'axios';
import apiService from "../../services/apiService";

class ListarUsuarios extends Component {
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
            idTipoDeUsuarioNavigation : this.state.idTipoDeUsuarioNavigation
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
                <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Senha</th>
                    <th>Tipo De Usuário</th>
                  </tr>
                </thead>

                <tbody>
                  {
                      this.state.listaUsuarios.map(element => {
                      return(
                        <tr key={element.id}>
                          <td>{element.id}</td>
                          <td>{element.email}</td>
                          <td>{element.senha}</td>
                          <td>{element.idTipoDeUsuarioNavigation.tipoDeUsuario1}</td>
                        </tr>
                      );
                      
                    })
                  }
                </tbody>
              </table>
            </div>
        )
    }
    
}
export default ListarUsuarios;
