import React, { Component } from "react";
import axios from 'axios';
import '../../assets/css/listar-usuario.css';
import Menu from "../../components/Menu/Menu"

class ListarUsuarios extends Component {
    constructor() {
        super();

        this.state = {
            listaUsuarios: [],
            listaTiposUsuarios: [],
            email: " ",
            senha: " ",
            idTipoDeUsuarioNavigation: " "
        };
    }
    buscarUsuarios() {
        let jwt = localStorage.getItem('usuario-spmedgroup');

        axios.get(`http://192.168.3.84:5000/api/usuarios`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const usuarios = res.data;
                this.setState({ listaUsuarios: usuarios })
            })
    }
    buscarTiposUsuarios() {
        let jwt = localStorage.getItem('usuario-spmedgroup');
        axios.get(`http://192.168.3.84:5000/api/tiposdeusuarios`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
            .then(res => {
                const tiposdeusuarios = res.data;
                this.setState({ idTipoDeUsuarioNavigation: tiposdeusuarios })
            })
    }

    atualizarEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }
    atualizarEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }
    atualizarEstadoTipoUsuario(event) {
        this.setState({ idTipoDeUsuarioNavigation: event.target.value });
    }

    cadastrarUsuario(event) {
        event.preventDefault();

        let usuario = {
            email: this.state.email,
            senha: this.state.senha,
            idTipoDeUsuarioNavigation: this.state.idTipoDeUsuarioNavigation
        };
        let jwt = localStorage.getItem('usuario-spmedgroup');
        axios.post(`http://192.168.3.84:5000/api/usuarios`, {
            headers: {
                "authorization": 'Bearer ' + jwt
            }
        })
        console.log(usuario)
            .then(res => {
                this.buscarUsuarios()
            })
    }
    componentDidMount() {
        this.buscarUsuarios();
        this.buscarTiposUsuarios();
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
                                <th className="usuario--listar__tabela-th">Email</th>
                                <th className="usuario--listar__tabela-th">Senha</th>
                                <th className="usuario--listar__tabela-th">Tipo De Usuário</th>
                            </tr>
                        </thead>

                        <tbody className="usuario--listar__tabela-tbody">
                            {
                                this.state.listaUsuarios.map(element => {
                                    return (
                                        <tr className="usuario--listar__tabela-tr-dados" key={element.id}>
                                            <td className="usuario--listar__tabela-td">{element.id}</td>
                                            <td className="usuario--listar__tabela-td">{element.email}</td>
                                            <td className="usuario--listar__tabela-td">{element.senha}</td>
                                            <td className="usuario--listar__tabela-td">{element.idTipoDeUsuarioNavigation.tipoDeUsuario1}</td>
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
        export default ListarUsuarios;
