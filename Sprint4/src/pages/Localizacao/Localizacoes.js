import React, { Component } from 'react'
import firebase from '../../services/firebase'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../../assets/css/localizacao.css';
import Menu from "../../components/Menu/Menu"

class Localizacoes extends Component {
    constructor() {
        super();
        this.state = {
            listaLocalizacoes: [],
            descricao: '',
            idade: '',
            lat: '',
            long: '',
            especialidade: '',
        }
    }
    listaLocalizacoesRealTime() {
        firebase.firestore().collection("localizacoes")
            .onSnapshot((localizacoes) => {
                let localizacoesArray = [];
                localizacoes.forEach((localizacoes) => {
                    localizacoesArray.push({
                        id: localizacoes.id,
                        descricao: localizacoes.data().descricao,
                        idade: localizacoes.data().localizacoes,
                        lat: localizacoes.data().lat,
                        long: localizacoes.data().long,
                        especialidade: localizacoes.data().especialidade
                    })
                })
                this.setState({ listaLocalizacoes: localizacoesArray }, () => {
                    console.log(this.state.listaLocalizacoes);
                })
            }
            )
    }
    atualizaEstado(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    limparFormulario() {
        this.setState({
            descricao: '',
            idade: '',
            long: '',
            lat: '',
            especialidade: ''
        })
    }
    salvarLocalizacao(event) {
        event.preventDefault();
        firebase.firestore().collection("localizacoes")
            .add({
                descricao: this.state.descricao,
                idade: Number(this.state.localizacoes),
                lat: this.state.lat,
                long: this.state.long,
                especialidade: this.state.especialidade
            })
            .then(() => {
                alert("Localização Cadastrada")
                this.limparFormulario();
            })
            .catch((erro) => {
                console.log('erro' + erro)
            })
    }
    displayMarkers = () => {
        return this.state.listaLocalizacoes.map((localizacoes) => {
            return <Marker key={localizacoes.id} position={{
                lat: localizacoes.lat,
                lng: localizacoes.long
            }}
                onClick={() => console.log("You clicked me!")} />
        })
    }

    componentDidMount() {
        this.listaLocalizacoesRealTime();
    }
    render() {
        return (
            <div className="localizacao--listar">
                <div className="cadastrar--listar__menu">
                    <Menu />
                </div>
                <h1 className="localizacao--listar__titulo">Cadastrar Localização</h1>
                <form onSubmit={this.salvarLocalizacao.bind(this)} noValidate className="localizacao--cadastrar__formulario">
                    <div className="localizacao--cadastrar__form_all">
                        <div className="localizacao--cadastrar__form_a">
                            <input
                                type="text"
                                required
                                onChange={this.atualizaEstado.bind(this)}
                                placeholder="Descrição"
                                value={this.state.descricao}
                                className="localizacao--cadastrar__input"
                            />
                            <input
                                type="text"
                                required
                                value={this.state.idade}
                                onChange={this.atualizaEstado.bind(this)}
                                placeholder="Idade"
                                className="localizacao--cadastrar__input"
                            />
                            <input
                                type="text"
                                value={this.state.especialidade}
                                required
                                onChange={this.atualizaEstado.bind(this)}
                                placeholder="Especialidade"
                                className="localizacao--cadastrar__input"
                            />
                        </div>
                        <div className="localizacao--cadastrar__form_b">

                            <input
                                type="text"
                                required
                                value={this.state.lat}
                                onChange={this.atualizaEstado.bind(this)}
                                placeholder="Latitude"
                                className="localizacao--cadastrar__input"
                            />
                            <input
                                type="text"
                                required
                                value={this.state.long}
                                onChange={this.atualizaEstado.bind(this)}
                                placeholder="Longitude"
                                className="localizacao--cadastrar__input"
                            />
                            <div className="localizacao--cadastrar__botao">
                                <button type="submit">
                                    Cadastrar
                </button>
                            </div>
                        </div>
                    </div>

                </form >
                <h1 className="localizacao--listar__titulo">Listar Localizações</h1>
                <div className="localizacao--listar__tabela">
                    <table className="localizacao--listar__tabela-tabela">
                        <thead className="localizacao--listar__tabela-thead">
                            <tr className="localizacao--listar__tabela-tr">
                                <th className="localizacao--listar__tabela-th">Descrição</th>
                                <th className="localizacao--listar__tabela-th">Especialidade</th>
                                <th className="localizacao--listar__tabela-th">Idade</th>
                                <th className="localizacao--listar__tabela-th">Latitude</th>
                                <th className="localizacao--listar__tabela-th">Longitude</th>
                            </tr>
                        </thead>

                        <tbody className="localizacao--listar__tabela-tbody">
                            {
                                this.state.listaLocalizacoes.map(localizacoes => {
                                    return (
                                        <tr className="localizacao--listar__tabela-tr-dados" key={localizacoes.id}>
                                            <td className="localizacao--listar__tabela-td">{localizacoes.descricao}</td>
                                            <td className="localizacao--listar__tabela-td">{localizacoes.idade}</td>
                                            <td className="localizacao--listar__tabela-td">{localizacoes.especialidade}</td>
                                            <td className="localizacao--listar__tabela-td">{localizacoes.lat}</td>
                                            <td className="localizacao--listar__tabela-td">{localizacoes.long}</td>
                                        </tr>
                                    );

                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Map
                    google={this.props.google}
                    zoom={8}
                    initialCenter={{ lat: -23.5504533, lng: -46.6514207 }}
                >
                    {this.displayMarkers()}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCFaeo0DBcDmUmXPuipE-_b9bqlWq41kV8")
})(Localizacoes)
