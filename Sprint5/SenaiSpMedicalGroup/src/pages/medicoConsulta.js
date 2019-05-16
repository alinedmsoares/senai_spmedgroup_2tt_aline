import React from 'react';
import { Component } from 'react';
import style from 'react';
import { StyleSheet, Text, View, FlatList,AsyncStorage } from "react-native";
import api from "../services/api";
import jwt from "jwt-decode";
import moment from 'moment';


class medicoConsulta extends Component {
  static navigationOptions = {
    header: null
  }
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
    const resposta = await api.get("/consultas/agendadas", {
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
        <View style={styles.appTitle}>
          <Text style={styles.appTitleTitle}>Consultas Agendadas</Text>
        </View>
        <View style={styles.appHeader}>
          <Text style={styles.appHeaderMedico}>Paciente</Text>
          <Text style={styles.appHeaderData}>Data/Hora</Text>
          <Text style={styles.appHeaderSituacao}>Situação</Text>
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
  renderizaItem = ({ item }) =>
    (
      <View style={style.flatItemLinha}>
        <View style={styles.flatItemContainer}>
          <Text style={styles.flatItemNome}>{item.idProntuarioNavigation.nome}</Text>
          <Text style={styles.flatItemData}>{moment(item.dataConsulta).format("DD/MM/YY-HH:mm")}</Text>
          <Text style={styles.flatItemSituacao}>{item.idSituacaoNavigation.situacao1}</Text>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
  appBody: {
    flex: 1,
    backgroundColor: '#3C81F7'
  },
  appTitleTitle: {
    color: "white",
    fontSize: 30,
  },
  appHeaderData: {
    fontSize: 15,
    color: "white",
    marginTop: 4,
    fontFamily: "OpenSans-Bold",
    fontWeight: 'bold',
  },
  appHeaderMedico: {
    fontSize: 15,
    color: "white",
    marginTop: 4,
    fontFamily: "OpenSans-Bold",
    fontWeight: 'bold',
  },
  appHeaderSituacao: {
    fontSize: 15,
    color: "white",
    marginTop: 4,
    fontFamily: "OpenSans-Bold",
    fontWeight: 'bold',
  },
  appTitle: {
    width: 400,
    height: 100,
    alignItems: "center",
    justifyContent: "flex-end",

  },
  appHeader: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 50,
  },
  flatItemLinha: {
    flexDirection: "row",
    borderBottomWidth: 0.9,
    borderBottomColor: "white",
  },
  flatItemContainer: {
    flex: 7,
    marginTop: 10,
    borderColor: "white",
    borderWidth: 0.9,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    padding: 10,
    height: 70,
    width: 350,
    marginLeft: 30,

  },
  flatItemNome: {
    fontSize: 15,
    color: "white",
    fontFamily: "OpenSans-Light",
  },
  flatItemData: {
    fontSize: 15,
    color: "white",
    fontFamily: "OpenSans-Light",
  },
  flatItemSituacao: {
    fontSize: 15,
    color: "white",
    fontFamily: "OpenSans-Light",
  },
})
export default medicoConsulta;