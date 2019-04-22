import React, { Component } from 'react';
import Axios from "axios";
import apiService from "../../services/apiService";

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
            descricao:"",
            idSituacaoNavigation: 1
        };
    }
    buscarConsultas() {
        let jwt = localStorage.getItem('usuario-spmedgroup');

        Axios.get(`http://localhost:5000/api/consultas`, {
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

        Axios.get(`http://localhost:5000/api/pacientes`, {
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

        Axios.get(`http://localhost:5000/api/medicos`, {
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
        Axios.post(`http://localhost:5000/api/consultas`, consulta, {
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
            <div>  
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome do Paciente</th>
                            <th>Nome do Médico</th>
                            <th>Data da Consulta</th>
                            <th>Descricao</th>
                            <th>Situacao</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.listaConsultas.map(consulta => {
                                return (
                                    <tr key={consulta.id}>
                                        <td>{consulta.id}</td>
                                        <td>{consulta.idProntuarioNavigation.nome}</td>
                                        <td>{consulta.idMedicoNavigation.nome}</td>
                                        <td>{consulta.dataConsulta}</td>
                                        <td>{consulta.descricao}</td>
                                        {/* <td>{consulta.idSituacaoNavigation.situacao1}</td> */}
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

export default ListarConsulta;
