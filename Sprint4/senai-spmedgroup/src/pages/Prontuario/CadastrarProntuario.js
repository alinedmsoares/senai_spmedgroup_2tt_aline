import React, { Component } from 'react';
import Axios from "axios";
import apiService from "../../services/apiService";


class CadastrarProntuario extends Component {
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
                <h1>Cadastrar Prontuário</h1>

                <form onSubmit={this.CadastrarProntuario.bind(this)} noValidate>
                    <input
                        type="text"
                        value={this.state.nome}
                        onChange={this.atualizaEstadoNome.bind(this)}
                        placeholder="Nome"
                    />
                    <input
                        type="date"
                        value={this.state.dataDeNascimento}
                        onChange={this.atualizaEstadoData.bind(this)}
                        placeholder="dd/MM/yyyy"
                    />
                    <input
                        type="text"
                        value={this.state.telefone}
                        onChange={this.atualizaEstadoTelefone.bind(this)}
                        placeholder="Telefone"
                    />
                    <input
                        type="text"
                        value={this.state.rg}
                        onChange={this.atualizaEstadoRg.bind(this)}
                        placeholder="Rg"
                    />
                    <input
                        type="text"
                        value={this.state.cpf}
                        onChange={this.atualizaEstadoCpf.bind(this)}
                        placeholder="CPF"
                    />
                    <select
                    value={this.state.idUsuarioNavigation}
                    onChange={this.atualizaEstadoUsuario.bind(this)} required>
                <option>Selecione o email do usuário</option>
                {this.state.listaUsurios.map(element => {
                    return (
                        <option key={element.id} value={element.id}>
                            {element.email}
                        </option>
                    );
                })}
                </select>
                    <input
                        type="text"
                        value={this.state.endereco}
                        onChange={this.atualizaEstadoEndereco.bind(this)}
                        placeholder="Endereço"
                    />
                    <button type="submit" onClick={this.CadastrarProntuario.bind(this)}>
                        Cadastrar
</button>
                </form>
                </div >
            )
    }
}
export default CadastrarProntuario;