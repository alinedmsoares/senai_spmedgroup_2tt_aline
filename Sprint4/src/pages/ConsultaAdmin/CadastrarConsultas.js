import React, { Component } from 'react';
import Axios from "axios";
import Menu from "../../components/Menu/Menu"
import '../../assets/css/reset.css';
import '../../assets/css/cadastrar-consulta.css';

class CadastrarConsulta extends Component {
    constructor() {
        super();
        this.state = {
            listaConsultas: [],
            listaProntuarios: [],
            listaMedicos: [],
            idProntuarioNavigation: "",
            idMedicoNavigation: "",
            dataConsulta: "",
            idSituacaoNavigation: 3
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
    CadastrarConsulta(event) {
        event.preventDefault();

        let consulta = {
            IdProntuario: this.state.idProntuarioNavigation,
            IdMedico: this.state.idMedicoNavigation,
            dataConsulta: this.state.dataConsulta,
            IdSituacao: 3
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
            <div className="consulta--cadastrar">  
            <div className="cadastrar--consulta__menu">
                <Menu/>
                </div>
                <div className="consulta--cadastrar__form">
                <h1 className="consulta--cadastrar__titulo">Cadastrar Consulta</h1>

            <form onSubmit={this.CadastrarConsulta.bind(this)} noValidate className="consulta--cadastrar__formulario">
            <div className="consulta--cadastrar__form_all">

                    <select
                    required
                    value={this.state.idMedicoNavigation}
                        onChange={this.atualizaEstadoMedico.bind(this)} required className="consulta--cadastrar__select">
                    
                    <option>Selecione o médico</option>
                    {this.state.listaMedicos.map(element => {
                        return (
                            <option key={element.id} value={element.id}>
                                {element.nome}
                            </option>
                        );
                    })}
                    </select>
                <input
                    type="datetime-local"
                    required
                    value={this.state.dataConsulta}
                    onChange={this.atualizaEstadoData.bind(this)}
                    placeholder="Data da Consulta"
                    className="consulta--cadastrar__input"
                />
                <select
                required
                    value={this.state.idProntuarioNavigation}
                    onChange={this.atualizaEstadoProntuario.bind(this)} required className="consulta--cadastrar__select">
                <option>Selecione o paciente</option>
                {this.state.listaProntuarios.map(element => {
                    return (
                        <option key={element.id} value={element.id}>
                            {element.nome}
                        </option>
                    );
                })}
                </select> 
                </div>           
                <div className="consulta--cadastrar__botao">
            <button onClick={this.CadastrarConsulta.bind(this)}>
                Cadastrar
                </button>
                </div>

                </form >
                </div>
                </div >
                
                )
    }
}

export default CadastrarConsulta;
