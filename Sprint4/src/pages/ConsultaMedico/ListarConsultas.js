import React, { Component } from 'react';
import Axios from "axios";
import '../../assets/css/listar-consulta.css';
import MenuMedico from "../../components/Menu/MenuMedico";
import moment from 'moment'
import Modal from 'react-modal';



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
            idSituacaoNavigation: 1,
        };
    }
    buscarConsultas() {
        let jwt = localStorage.getItem('usuario-spmedgroup');

        Axios.get(`http://192.168.3.84:5000/api/consultas/agendadas`, {
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
        const idConsulta = (event.target.getAttribute('idConsulta'))
        let consulta = {

            descricao: this.state.descricao
        }
        let jwt = localStorage.getItem('usuario-spmedgroup');
        Axios.put(`http://192.168.3.84:5000/api/consultas/descricao/` + idConsulta, consulta, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }

        }
        )
            .then(_res => {
                this.buscarConsultas()
            })

    }

    componentDidMount() {
        this.buscarConsultas();
    }
    render() {
        return (
            <div className="consulta--listar">
                <div className="consulta--listar__menu">
                    <MenuMedico />
                </div>
                <h1 className="consulta--listar__titulo">Listar Consultas</h1>
                <div className="consulta--listar__tabela">
                    <table className="consulta--listar__tabela-tabela">
                        <thead className="consulta--listar__tabela-thead">
                            <tr className="consulta--listar__tabela-tr">
                                <th className="consulta--listar__tabela-th">#</th>
                                <th className="consulta--listar__tabela-th">Nome do Paciente</th>
                                <th className="consulta--listar__tabela-th">Data da Consulta</th>
                                <th className="consulta--listar__tabela-th">Situação</th>
                                <th className="consulta--listar__tabela-th">Descrição</th>
                            </tr>
                        </thead>

                        <tbody className="consulta--listar__tabela-tbody">
                            {
                                this.state.listaConsultas.map(consulta => {
                                    return (
                                        <tr className="consulta--listar__tabela-tr-dados" key={consulta.id} id={consulta.id}>
                                            <td className="consulta--listar__tabela-td">{consulta.id}</td>
                                            <td className="consulta--listar__tabela-td">{consulta.idProntuarioNavigation.nome}</td>
                                            <td className="consulta--listar__tabela-td">{moment(consulta.dataConsulta).format("DD/MM/YYYY - HH:mm")}</td>
                                            <td className="consulta--listar__tabela-td">{consulta.idSituacaoNavigation.situacao1}</td>
                                            <td className="consulta--listar__tabela-td">
                                                <input
                                                    type="text"
                                                    value={consulta.descricao}
                                                    onChange={this.atualizaEstadoDescricao.bind(this)}
                                                    placeholder="Insira uma descricão"
                                                />
                                                <button type="submit" idConsulta={consulta.id} onClick={this.CadastrarDescricao.bind(this)} className="consulta--listar__botao">
                                                    Cadastrar
                                                    </button>
                                            </td>
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

export default ListarConsultaMedico;
