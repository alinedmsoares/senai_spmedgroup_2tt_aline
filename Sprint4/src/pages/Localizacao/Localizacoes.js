import React, { Component } from 'react'
import firebase from '../../services/firebase'

export default class Localizacoes extends Component {
    constructor() {
        super();
        this.state = {
            listaLocalizacoes: [],
            descricao: '',
            idade: '',
            lat: '',
            long: '',
            especialidade: ''
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
                        long : localizacoes.data().long,
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
            lat : '',
            especialidade: ''
        })
    }
    salvarLocalizacao(event) {
        event.preventDefault();
        firebase.firestore().collection("localizacoes")
            .add({
                descricao:this.state.descricao,
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
    componentDidMount() {
        this.listaLocalizacoesRealTime();
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.listaLocalizacoes.map((localizacoes) => {
                            return (<li key={localizacoes.id}>{localizacoes.id} - {localizacoes.descricao} - {localizacoes.idade} -  
                            {localizacoes.long} - {localizacoes.lat} </li>)
                        })
                    }
                </ul>

                <form onSubmit={this.salvarLocalizacao.bind(this)}>
                        <label>Idade</label>
                        <input
                            type="text"
                            name="idade"
                            defaultValue={this.state.idade}
                            onChange={this.atualizaEstado.bind(this)} required>
                        </input>

                        <label>Descrição</label>
                        <input
                            type="text"
                            name="descricao"
                            defaultValue={this.state.descricao}
                            onChange={this.atualizaEstado.bind(this)} required>
                        </input>

                        <label>Especialidade</label>
                        <input
                            type="text"
                            name="especialidade"
                            defaultValue={this.state.especialidade}
                            onChange={this.atualizaEstado.bind(this)} required>
                        </input>

                        <label>Latitude</label>
                        <input
                            type="text"
                            name="lat"
                            defaultValue={this.state.lat}
                            onChange={this.atualizaEstado.bind(this)} required>
                        </input>

                        <label>Longitude</label>
                        <input
                            type="text"
                            name="long"
                            defaultValue={this.state.long}
                            onChange={this.atualizaEstado.bind(this)} required>
                        </input>

                        <button type="submit">Salvar</button>
                    </form>
            </div>
        )
    }
}
