import React, { Component } from 'react';
import Axios from "axios";
import apiService from "../../services/apiService";

class ListarProntuario extends Component {
    constructor() {
        super();
        this.state = {
            listaProntuarios: [],
            listaUsurios:[],
            nome: "",
            dataDeNascimento: "",
            idUsuarioNavigation:"",
            telefone: "",
            rg: "",
            cpf: "",
            endereco: ""
        }
    }
    buscarProntuario() {
        let jwt = localStorage.getItem('usuario-spmedgroup');
        
        Axios.get(`http://localhost:5000/api/pacientes`,{
            headers:{
                "authorization": 'Bearer ' + jwt
            }})
            .then(res => {
                const prontuarios = res.data;
                this.setState({ listaProntuarios: prontuarios })
            })
    }
    buscarUsuarios() {
        let jwt = localStorage.getItem('usuario-spmedgroup');
        
        Axios.get(`http://localhost:5000/api/usuarios`,{
            headers:{
                "authorization": 'Bearer ' + jwt
            }})
            .then(res => {
                const usuario = res.data;
                this.setState({ listaUsurios: usuario })
            })
    }
    atualizaEstadoNome(event) {
        this.setState({ nome: event.target.value })
    }
    atualizaEstadoData(event) {
        this.setState({ dataDeNascimento: event.target.value })
    }
    atualizaEstadoTelefone(event) {
        this.setState({ telefone: event.target.value })
    }
    atualizaEstadoRg(event) {
        this.setState({ rg: event.target.value })
    }
    atualizaEstadoCpf(event) {
        this.setState({ cpf: event.target.value })
    }
    atualizaEstadoEndereco(event) {
        this.setState({ endereco: event.target.value })
    }
    atualizaEstadoUsuario(event) {
        this.setState({ idUsuarioNavigation: event.target.value })
    }

    CadastrarProntuario(event) {
        event.preventDefault();

        let prontuario = {
            nome: this.state.nome,
            dataDeNascimento : this.state.dataDeNascimento,
            telefone: this.state.telefone,
            rg: this.state.rg,
            cpf: this.state.cpf,
            idUsuario: this.state.idUsuarioNavigation,
            endereco: this.state.endereco
        }
        let jwt = localStorage.getItem('usuario-spmedgroup');
        Axios.post(`http://localhost:5000/api/pacientes`, prontuario,{
            headers:{
                "authorization": 'Bearer ' + jwt
            }})
            .then(res => {
                this.buscarProntuario()
            })
            console.log(prontuario)
    }
    componentDidMount() {
        this.buscarProntuario();
        this.buscarUsuarios();
    }
    render() {
        return (
                <div>
                <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome do Paciente</th>
                    <th>Data de Nascimento</th>
                    <th>Usuário</th>
                    <th>Telefone</th>
                    <th>RG</th>
                    <th>CPF</th>
                    <th>Endereço</th>
                  </tr>
                </thead>

                <tbody>
                  {
                      this.state.listaProntuarios.map(prontuario => {
                      return(
                        <tr key={prontuario.id}>
                          <td>{prontuario.id}</td>
                          <td>{prontuario.nome}</td>
                          <td>{prontuario.dataDeNascimento}</td>
                          <td>{prontuario.idUsuarioNavigation.email}</td>
                          <td>{prontuario.telefone}</td>
                          <td>{prontuario.rg}</td>
                          <td>{prontuario.cpf}</td>
                          <td>{prontuario.endereco}</td>

                        </tr>
                      );
                      
                    })
                  }
                </tbody>
              </table> 

                </div >
            )
    }
}
export default ListarProntuario;