import React, { Component } from 'react';
import Axios from "axios";
import apiService from "../../services/apiService";

class ListarConsultaMedico extends Component {
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
            idSituacaoNavigation: 1
        };
    }
    buscarConsultas() {
        let jwt = localStorage.getItem('usuario-spmedgroup');

        Axios.get(`http://localhost:5000/api/consultas/agendadas`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const consultas = res.data;
                this.setState({ listaConsultas: consultas })
            })
    }
    atualizaEstadoDescricao(event) {
        this.setState({ descricao: event.target.value })
    }
    CadastrarDescricao(event) {
        event.preventDefault();

        let consulta = {
            descricao: this.state.descricao,
        }
        let jwt = localStorage.getItem('usuario-spmedgroup');
        Axios.put(`http://localhost:5000/api/consultas`, consulta, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }

        }
        )
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
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome do Paciente</th>
                            <th>Data da Consulta</th>
                            <th>Situacao</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.listaConsultas.map(consulta => {
                                return (
                                    <tr key={consulta.id}>
                                        <td>{consulta.id}</td>
                                        <td>{consulta.idProntuarioNavigation.nome}</td>
                                        <td>{consulta.dataConsulta}</td>
                                        {/* <td>{consulta.idSituacaoNavigation.situacao1}</td> */}
                                        <td>
                                            <form onSubmit={this.CadastrarDescricao.bind(this)} noValidate>
                                                <input
                                                    type="text"
                                                    value={this.state.nome}
                                                    onChange={this.atualizaEstadoDescricao.bind(this)}
                                                    placeholder="Insira uma descricão"
                                                />
                                                <button type="submit" onClick={this.CadastrarDescricao.bind(this)}>
                                                    Cadastrar
</button>
                                            </form>
                                        </td>
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

export default ListarConsultaMedico;
