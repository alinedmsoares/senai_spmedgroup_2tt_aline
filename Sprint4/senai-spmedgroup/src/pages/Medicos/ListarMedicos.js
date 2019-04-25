import React, { Component } from "react";
import axios from 'axios';
import apiService from "../../services/apiService";
// import '../../assets/css/listar-medicos.css';
import Menu from "../../components/Menu/Menu"
import moment from 'moment'

class ListarMedicos extends Component {
    constructor() {
        super();

        this.state = {
            listaMedicos: [],
            listaUsuario:[],
            listaClinica:[],
            nome: " ",
            crm: " ",
            IdClinicaNavigation: "",
            IdUsuarioNavigation: ""
        };
    }
    buscarMedicos() {
        let jwt = localStorage.getItem('usuario-spmedgroup');

        axios.get(`http://localhost:5000/api/medicos`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const medicos = res.data;
                this.setState({ listaMedicos: medicos })
            })
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
                this.setState({ IdClinicaNavigation: clinica })
            })
    }
    buscarUsuarios() {
        let jwt = localStorage.getItem('usuario-spmedgroup');
        axios.get(`http://localhost:5000/api/usuarios`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const usuario = res.data;
                this.setState({ IdUsuarioNavigation: usuario })
            })
    }

    atualizarEstadoNome(event) {
        this.setState({ nome: event.target.value });
    }
    atualizarEstadoCrm(event) {
        this.setState({ crm: event.target.value });
    }
    atualizarEstadoUsuario(event) {
        this.setState({ IdUsuarioNavigation: event.target.value });
    }
    atualizarEstadoClinica(event) {
        this.setState({ IdClinicaNavigation: event.target.value });
    }
    componentDidMount() {
        this.buscarClinica();
        this.buscarMedicos();
        this.buscarUsuarios();
    }
    render() {
        return (
            <div className="usuario--listar">
                <div className="cadastrar--listar__menu">
                    <Menu />
                </div>
                <h1 className="usuario--listar__titulo">Listar Usuários</h1>

                <div className="usuario--listar__tabela">
                    <table className="usuario--listar__tabela-tabela">
                        <thead className="usuario--listar__tabela-thead">
                            <tr className="usuario--listar__tabela-tr">
                                <th className="usuario--listar__tabela-th">#</th>
                                <th className="usuario--listar__tabela-th">Nome</th>
                                <th className="usuario--listar__tabela-th">CRM</th>
                                <th className="usuario--listar__tabela-th">Email</th>
                                <th className="usuario--listar__tabela-th">Clínica</th>

                            </tr>
                        </thead>

                        <tbody className="usuario--listar__tabela-tbody">
                            {
                                this.state.listaMedicos.map(element => {
                                    return (
                                        <tr className="usuario--listar__tabela-tr-dados" key={element.id}>
                                            <td className="usuario--listar__tabela-td">{element.id}</td>
                                            <td className="usuario--listar__tabela-td">{element.nome}</td>
                                            <td className="usuario--listar__tabela-td">{element.crm}</td>
                                            {/* <td className="usuario--listar__tabela-td">{element.IdClinicaNavigation.nomefantasia}</td> */}
                                            {/* <td className="usuario--listar__tabela-td">{element.IdUsuarioNavigation.email}</td> */}

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
        export default ListarMedicos;
