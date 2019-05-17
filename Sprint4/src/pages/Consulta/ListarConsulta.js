import React, { Component } from 'react';
import Axios from "axios";
import apiService from "../../services/apiService";
import '../../assets/css/listar-consulta.css';
import Menu from "../../components/Menu/Menu"
import moment from 'moment'



class ListarConsulta extends Component {
    constructor() {
        super();
        this.state = {
            listaConsultas: [],
            listaProntuarios: [],
            listaMedicos: [],
            idProntuarioNavigation: "",
            idMedicoNavigation: "",
            dataConsulta: "",
            descricao: "",
            idSituacaoNavigation: ""
        };
    }
    buscarConsultas() {
        let jwt = localStorage.getItem('usuario-spmedgroup');

        Axios.get(`http://192.168.3.84:5000/api/consultas`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const consultas = res.data;
                this.setState({ listaConsultas: consultas })
            })
    }
    buscarProntuarios() {
        let jwt = localStorage.getItem('usuario-spmedgroup');

        Axios.get(`http://192.168.3.84:5000/api/pacientes`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const prontuarios = res.data;
                this.setState({ listaProntuarios: prontuarios })
            })
    }
    buscarMedicos() {
        let jwt = localStorage.getItem('usuario-spmedgroup');

        Axios.get(`http://192.168.3.84:5000/api/medicos`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const medicos = res.data;
                this.setState({ listaMedicos: medicos })
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
    atualizaEstadoDescricao(event) {
        this.setState({ descricao: event.target.value })
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
        this.buscarMedicos();
        this.buscarProntuarios();
    }
    render() {
        return (
            <div className="consulta--listar">
                <div className="cadastrar--listar__menu">
                    <Menu />
                </div>
                <h1 className="consulta--listar__titulo">Listar Consultas</h1>
                <div className="consulta--listar__tabela">
                    <table className="consulta--listar__tabela-tabela">
                        <thead className="consulta--listar__tabela-thead">
                            <tr className="consulta--listar__tabela-tr">
                                <th className="consulta--listar__tabela-th">#</th>
                                <th className="consulta--listar__tabela-th">Paciente</th>
                                <th className="consulta--listar__tabela-th">Médico</th>
                                <th className="consulta--listar__tabela-th">Data da Consulta</th>
                                <th className="consulta--listar__tabela-th">Situação</th>
                                <th className="consulta--listar__tabela-th">Descrição</th>
                            </tr>
                        </thead>

                        <tbody className="consulta--listar__tabela-tbody">
                            {
                                this.state.listaConsultas.map(consulta => {
                                    return (
                                        <tr className="consulta--listar__tabela-tr-dados" key={consulta.id}>
                                            <td className="consulta--listar__tabela-td">{consulta.id}</td>
                                            <td className="consulta--listar__tabela-td">{consulta.idProntuarioNavigation.nome}</td>
                                            <td className="consulta--listar__tabela-td">{consulta.idMedicoNavigation.nome}</td>
                                            <td className="consulta--listar__tabela-td">{moment(consulta.dataConsulta).format("DD/MM/YYYY - HH:mm")}</td>
                                            <td className="consulta--listar__tabela-td">{consulta.idSituacaoNavigation.situacao1}</td>
                                            <td className="consulta--listar__tabela-td">{consulta.descricao}</td>
                                            {/* <td>{consulta.idSituacaoNavigation.situacao1}</td> */}
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

export default ListarConsulta;
