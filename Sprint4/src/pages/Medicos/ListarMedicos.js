import React, { Component } from "react";
import axios from 'axios';
import '../../assets/css/listar-medico.css';
import Menu from "../../components/Menu/Menu"

class ListarMedicos extends Component {
    constructor() {
        super();

        this.state = {
            listaMedicos: [],
            listaUsuario:[],
            listaClinica:[],
            nome: " ",
            crm: " ",
            idEspecialidadeNavigation: "",
            idUsuarioNavigation: ""
        };
    }
    buscarMedicos() {
        let jwt = localStorage.getItem('usuario-spmedgroup');

        axios.get(`http://192.168.3.84:5000/api/medicos`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const medicos = res.data;
                this.setState({ listaMedicos: medicos })
            })
    }
    buscarEspecialidade() {
        let jwt = localStorage.getItem('usuario-spmedgroup');
        axios.get(`http://192.168.3.84:5000/api/especialidade`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const especialidade = res.data;
                this.setState({ IdEspecialidadeNavigation: especialidade })
            })
    }
    buscarUsuarios() {
        let jwt = localStorage.getItem('usuario-spmedgroup');
        axios.get(`http://192.168.3.84:5000/api/usuarios`, {
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
        this.setState({ idUsuarioNavigation: event.target.value });
    }
    atualizarEstadoEspecialidade(event) {
        this.setState({ idEspecialidadeNavigation: event.target.value });
    }
    componentDidMount() {
        this.buscarEspecialidade();
        this.buscarMedicos();
        this.buscarUsuarios();
    }
    realizarLogout() {
        localStorage.clear();
        window.location.href = '/';
      }
    render() {
        return (
            <div className="medico--listar">
                <div className="cadastrar--listar__menu">
                    <Menu />
                </div>
                <div className="logout">
                    <button onClick={this.realizarLogout.bind(this)}>
                Sair 
            </button>
                </div>
                <h1 className="medico--listar__titulo">Listar Médicos</h1>

                <div className="medico--listar__tabela">
                    <table className="medico--listar__tabela-tabela">
                        <thead className="medico--listar__tabela-thead">
                            <tr className="medico--listar__tabela-tr">
                                <th className="medico--listar__tabela-th">#</th>
                                <th className="medico--listar__tabela-th">Nome</th>
                                <th className="medico--listar__tabela-th">CRM</th>
                                <th className="medico--listar__tabela-th">Email</th>
                                <th className="medico--listar__tabela-th">Especialidade</th>

                            </tr>
                        </thead>

                        <tbody className="medico--listar__tabela-tbody">
                            {
                                this.state.listaMedicos.map(element => {
                                    return (
                                        <tr className="medico--listar__tabela-tr-dados" key={element.id}>
                                            <td className="medico--listar__tabela-td">{element.id}</td>
                                            <td className="medico--listar__tabela-td">{element.nome}</td>
                                            <td className="medico--listar__tabela-td">{element.crm}</td>
                                            <td className="medico--listar__tabela-td">{element.idUsuarioNavigation.email}</td>
                                            <td className="medico--listar__tabela-td">{element.idEspecialidadeNavigation.nome}</td> 

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
