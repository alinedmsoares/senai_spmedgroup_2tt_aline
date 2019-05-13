import React from 'react';
import { Component } from 'react';
import style from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpaciy, TextInput, AsyncStorage } from "react-native";
import api from "../senaiSpMedGroup/src/services/api";
import jwt from "jwt-decode";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      listaMedicos: [],
      listaProntuarios: [],
      listaSituacao: [],
      IdUsuario: "",
      token: ""
    };
  };

  componentDidMount() {
    this.carregaToken();
  };

  carregaToken = async () => {
    await AsyncStorage.getItem("userToken").then((token) => {
      this.setState({ token: token }, () => {
        this.carregaConsulta();
        this.carregaMedicos();
        this.carregaProntuarios();
        this.carregaSituacao();
        this.buscarDados();
      });
    });
  }
  buscarDados = async () => {
    try {
        const value = await AsyncStorage.getItem("userToken");
        if (value !== null) {
            this.setState({ IdUsuario: jwt(value).IdUsuario });
            this.setState({ token: value });
        }
    } catch (error) { }
};
  carregaConsulta = async () => {
    const userToken = this.state.token;
    const resposta = await api.get("/consultas", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + userToken
      }
    });
    const dadosDaApi = resposta.data;
    this.setState({listaConsultas : dadosDaApi});
  };
  carregaMedicos = async () => {
    const userToken = this.state.token;
    const resposta = await api.get("/medicos", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + userToken
      }
    });
    const dadosDaApi = resposta.data;
    this.setState({listaMedicos : dadosDaApi});
  };
  carregaProntuarios = async () => {
    const userToken = this.state.token;
    const resposta = await api.get("/pacientes", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + userToken
      }
    });
    const dadosDaApi = resposta.data;
    this.setState({listaProntuarios : dadosDaApi});
  };
  carregaSituacao = async () => {
    const userToken = this.state.token;
    const resposta = await api.get("/situacao", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + userToken
      }
    });
    const dadosDaApi = resposta.data;
    this.setState({listaSituacao : dadosDaApi});
  };

  render() {
    return (
      <View style={styles.appBody}>
        <Text styles={styles.appTitle}>Minhas Consultas</Text>
        <View style={styles.appHeader}>
          <Text style={styles.appHeaderId}>#</Text>
          <Text style={styles.appHeaderPaciente}>Paciente</Text>
          <Text styles={styles.appHeaderSituacao}>Situação</Text>
        </View>
        <FlatList
        contentContainerStyle={StyleSheet.appTableConteudo}
        data={this.state.listaConsultas}
        keyExtractor={item => item.id}
        renderItem={this.renderizaItem}
        />
      </View>
    );
  }
  renderizaItem = ({item}) =>
  (
    <View>
      <Text>{item.id}</Text>
      {/* <Text>{item.idMedicoNavigation.nome}</Text> */}
      <Text>{item.idProntuarioNavigation.nome}</Text>
      <Text>{item.idSituacaoNavigation.situacao1}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  appBody:{
    flex : 1,
    backgroundColor: '#394BF9'
  }
})
export default App;