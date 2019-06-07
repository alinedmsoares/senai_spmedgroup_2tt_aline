import React, { Component } from 'react';
import Axios from "axios";
import '../../assets/css/listar-prontuario.css';
import Menu from "../../components/Menu/Menu"
import moment from 'moment'

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
        
        Axios.get(`http://192.168.3.84:5000/api/pacientes`,{
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
        
        Axios.get(`http://192.168.3.84:5000/api/usuarios`,{
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
        Axios.post(`http://192.168.3.84:5000/api/pacientes`, prontuario,{
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
                <div className="prontuario--listar">
                <div className="cadastrar--listar__menu">
                    <Menu />
                </div>
                <h1 className="prontuario--listar__titulo">Listar Prontuários</h1>
                <div className="prontuario--listar__tabela">
                <table className="prontuario--listar__tabela-tabela">
                <thead className="prontuario--listar__tabela-thead">
                  <tr className="prontuario--listar__tabela-tr">
                    <th className="prontuario--listar__tabela-th">#</th>
                    <th className="prontuario--listar__tabela-th">Nome do Paciente</th>
                    <th className="prontuario--listar__tabela-th">Data de Nascimento</th>
                    <th className="prontuario--listar__tabela-th">Usuário</th>
                    <th className="prontuario--listar__tabela-th">Telefone</th>
                    <th className="prontuario--listar__tabela-th">RG</th>
                    <th className="prontuario--listar__tabela-th">CPF</th>
                    <th className="prontuario--listar__tabela-th">Endereço</th>
                  </tr>
                </thead>

                <tbody className="prontuario--listar__tabela-tbody">
                  {
                      this.state.listaProntuarios.map(prontuario => {
                      return(
                        <tr className="prontuario--listar__tabela-tr-dados" key={prontuario.id}>
                          <td className="prontuario--listar__tabela-td">{prontuario.id}</td>
                          <td className="prontuario--listar__tabela-td">{prontuario.nome}</td>
                          <td className="prontuario--listar__tabela-td">{moment(prontuario.dataDeNascimento).format("DD/MM/YYYY")}</td>
                          <td className="prontuario--listar__tabela-td">{prontuario.idUsuarioNavigation.email}</td>
                          <td className="prontuario--listar__tabela-td">{prontuario.telefone}</td>
                          <td className="prontuario--listar__tabela-td">{prontuario.rg}</td>
                          <td className="prontuario--listar__tabela-td">{prontuario.cpf}</td>
                          <td className="prontuario--listar__tabela-td">{prontuario.endereco}</td>

                        </tr>
                      );
                      
                    })
                  }
                </tbody>
              </table> 

                </div >
                </div>
            )
    }
}
export default ListarProntuario;