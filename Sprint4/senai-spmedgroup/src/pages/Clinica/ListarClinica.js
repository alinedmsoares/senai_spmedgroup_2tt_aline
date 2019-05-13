import React, { Component } from "react";
import axios from 'axios';
import '../../assets/css/listar-clinica.css';
import Menu from "../../components/Menu/Menu"

class ListarClinica extends Component {
    constructor() {
        super();

        this.state = {
            listaClinica: [],
            nomeFantasia: " ",
            cnpj: " ",
            razaoSocial: "",
            endereco: "",
            horarioFuncionamento : ""
        };
    }
    buscarClinica() {
        let jwt = localStorage.getItem('usuario-spmedgroup');
        axios.get(`http://localhost:5000/api/clinicas`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const clinica = res.data;
                this.setState({ listaClinica: clinica })
            })
    }
    atualizarEstadoNomeFantasia(event) {
        this.setState({ nomeFantasia: event.target.value });
    }
    atualizarEstadoCnpj(event) {
        this.setState({ cnpj: event.target.value });
    }
    atualizarEstadoRazaoSocial(event) {
        this.setState({ razaoSocial: event.target.value });
    }
    atualizarEstadoEndereco(event) {
        this.setState({ endereco: event.target.value });
    }
    atualizarEstadoHorarioDeFuncionamento(event) {
        this.setState({ horarioFuncionamento: event.target.value });
    }
    componentDidMount() {
        this.buscarClinica();
    }
    render() {
        return (
            <div className="clinica--listar">
                <div className="cadastrar--listar__menu">
                    <Menu />
                </div>
                <h1 className="clinica--listar__titulo">Listar Clínica</h1>

                <div className="clinica--listar__tabela">
                    <table className="clinica--listar__tabela-tabela">
                        <thead className="clinica--listar__tabela-thead">
                            <tr className="clinica--listar__tabela-tr">
                                <th className="clinica--listar__tabela-th">#</th>
                                <th className="clinica--listar__tabela-th">Nome Fantasia</th>
                                <th className="clinica--listar__tabela-th">CNPJ</th>
                                <th className="clinica--listar__tabela-th">Razão Social</th>
                                <th className="clinica--listar__tabela-th">Endereço</th>
                                <th className="clinica--listar__tabela-th">Horário de Funcionamento</th>
                            </tr>
                        </thead>

                        <tbody className="clinica--listar__tabela-tbody">
                            {
                                this.state.listaClinica.map(element => {
                                    return (
                                        <tr className="clinica--listar__tabela-tr-dados" key={element.id}>
                                            <td className="clinica--listar__tabela-td">{element.id}</td>
                                            <td className="clinica--listar__tabela-td">{element.nomeFantasia}</td>
                                            <td className="clinica--listar__tabela-td">{element.cnpj}</td>
                                            <td className="clinica--listar__tabela-td">{element.razaoSocial}</td>
                                            <td className="clinica--listar__tabela-td">{element.endereco}</td>
                                            <td className="clinica--listar__tabela-td">{element.horarioFuncionamento}</td>
                                        </tr>
                                    );

                                })
                            }
                        </tbody>
                    </table>
                </div>
                </div>
                )
            }
            
        }
        export default ListarClinica;
