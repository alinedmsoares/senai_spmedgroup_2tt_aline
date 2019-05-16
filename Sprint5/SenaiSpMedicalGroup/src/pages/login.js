import React, { Component } from "react";
import api from "../services/api";
import jwt from "jwt-decode"
import { View, AsyncStorage, TextInput, Image, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { email: "", senha: "" };
    }

    realizarLogin = async () => {
        const resposta = await api.post("/login", {
            email: this.state.email,
            senha: this.state.senha
        })
        const token = resposta.data.token
        await AsyncStorage.setItem("userToken", token)
        if (status == 400) {
            alert("Email ou senha incorretos")
        }
        if (jwt(token).Role === "Paciente") {
            this.props.navigation.navigate("ConsultasPacienteNavigator");
        }
        else {
            this.props.navigation.navigate("ConsultasMedicoNavigator");
        }
    };

    render() {
        return (
            <View style={styles.appBody}>
                <View style={styles.loginImg}>
                    <Image style={styles.loginImgImg}
                        source={require("../assets/img/icon.png")}
                    />
                </View>
                <TextInput style={styles.loginEmail}
                    underlineColorAndroid="#FFFFFF"
                    defaultValue="fernando@gmail.com"
                    placeholderTextColor="white"
                    placeholder="Email: "
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput style={styles.loginSenha}
                    underlineColorAndroid="#FFFFFF"
                    placeholderTextColor="white"
                    defaultValue="123456"
                    placeholder="Senha: "
                    secureTextEntry={true}
                    onChangeText={senha => this.setState({ senha })}
                />
                <TouchableOpacity
                    style={styles.loginEntrar}
                    onPress={this.realizarLogin}
                >
                    <Text style={styles.loginLoginText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({

    appBody: {
        backgroundColor: "#394BF9",
        alignItems: "center",
        padding: 40,
        flex: 1
    },
    loginEmail: {
        margin: 8,
        fontSize: 18,
        width: 250,
        color: "white"
    },
    loginSenha: {
        textDecorationColor: "#BEB2D7",
        margin: 8,
        fontSize: 18,
        width: 250,
        color: "white"

    },
    loginEntrar: {
        borderColor: "white",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 250,
        margin: 15,
        fontSize: 40,
        height: 45,

    },
    loginRoman: {
        color: "white",
        margin: 10,
        fontSize: 40

    },
    loginImg: {
        borderRadius: 400,
        width: 200,
        height: 200,
        backgroundColor: "#D2EDFC",
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    },
    loginImgImg: {
        width: 140,
        height: 150,
    },
    loginLoginText: {
        color: "white",
        fontSize: 28,

    }

});
export default Login;