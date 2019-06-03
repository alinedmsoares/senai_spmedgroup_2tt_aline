import React, { Component } from 'react';
import Axios from "axios";
import '../../assets/css/listar-consulta.css';
import MenuPaciente from "../../components/Menu/MenuPaciente"
import moment from 'moment'
import apiService from "../../services/apiService";

class ListarConsultaPaciente extends Component {
    constructor() {
        super();
        this.state = {
            listaConsultas: [],
            listaProntuarios: [],
            listaMedicos: [],
            idProntuarioNavigation: "",
            idMedicoNavigation: "",
            dataConsulta: "",
            idSituacaoNavigation: 1
        };
    }
    buscarConsultas() {
        let jwt = localStorage.getItem('usuario-spmedgroup');

        Axios.get(`http://192.168.3.84:5000/api/consultas/minhas`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const consultas = res.data;
                this.setState({ listaConsultas: consultas })
            })
    }
    atualizaEstadoProntuario(event) {
        this.setState({ idProntuarioNavigation: event.target.value })
    }
    atualizaEstadoMedico(event) {
        this.setState({ idMedicoNavigation: event.target.value })
    }
    atualizaEstadoData(event) {
        this.setState({ dataConsulta: event.target.value })
    }
    CadastrarConsulta(event) {
        event.preventDefault();

        let consulta = {
            IdProntuario: this.state.idProntuarioNavigation,
            IdMedico: this.state.idMedicoNavigation,
            dataConsulta: this.state.dataConsulta,
            IdSituacao: 1
        }
        let jwt = localStorage.getItem('usuario-spmedgroup');
        Axios.post(`http://192.168.3.84:5000/api/consultas`, consulta, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                this.buscarConsultas()
            })
        console.log(consulta)
    }
    componentDidMount() {
        this.buscarConsultas();
    }
    render() {
        return (
            <div className="consulta--listar">
            <div className="consulta--listar__menu">
                <MenuPaciente/>
                </div>  
                <h1 className="consulta--listar__titulo">Listar Consultas</h1>
                <div className="consulta--listar__tabela">

                <table className="consulta--listar__tabela-tabela">
                    <thead className="consulta--listar__tabela-thead">
                        <tr className="consulta--listar__tabela-tr">
                            <th className="consulta--listar__tabela-th">#</th>
                            <th className="consulta--listar__tabela-th">Nome do Médico</th>
                            <th className="consulta--listar__tabela-th">Data da Consulta</th>
                            <th className="consulta--listar__tabela-th">Situação</th>
                        </tr>
                    </thead>

                    <tbody className="consulta--listar__tabela-tbody">
                        {
                            this.state.listaConsultas.map(consulta => {
                                return (
                                    <tr className="consulta--listar__tabela-tr-dados" key={consulta.id}>
                                        <td className="consulta--listar__tabela-td">{consulta.id}</td>
                                        <td className="consulta--listar__tabela-td">{consulta.idMedicoNavigation.nome}</td>
                                        <td className="consulta--listar__tabela-td">{moment(consulta.dataConsulta).format("DD/MM/YYYY - HH:mm")}</td>
                                        <td className="consulta--listar__tabela-td">{consulta.idSituacaoNavigation.situacao1}</td> 
                                    </tr>
                                );

                            })
                        }
                    </tbody>
                </table> 
                </div>
                </div >
                )
    }
}

export default ListarConsultaPaciente;
