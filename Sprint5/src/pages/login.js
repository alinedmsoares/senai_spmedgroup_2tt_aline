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
        if (jwt(token).Role === "Paciente") {
            this.props.navigation.navigate("ConsultasPacienteNavigator");
        }
        else if (jwt(token).Role === "Medico") {
            this.props.navigation.navigate("ConsultasMedicoNavigator");
        }
    };

    render() {
        return (
            <ImageBackground
                source={require("../assets/img/fundo.jpg")}
                style={StyleSheet.absoluteFillObject}
            >
                <View style={styles.appBody}>
                    <View style={styles.loginImg}>
                        <Image style={styles.loginImgImg}
                            source={require("../assets/img/icon.png")}
                        />
                    </View>
                    <View style={styles.loginForm}>
                        <TextInput style={styles.loginEmail}
                            placeholderTextColor="white"
                            placeholder="Email "
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput style={styles.loginSenha}
                            placeholderTextColor="white"
                            placeholder="Senha "
                            secureTextEntry={true}
                            onChangeText={senha => this.setState({ senha })}
                        />
                        <TouchableOpacity
                            style={styles.loginEntrar}
                            onPress={this.realizarLogin}>

                            <Text style={styles.loginLoginText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground >
        )
    }
}
const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(183, 39, 255, 0.79)"
    },
    appBody: {
        alignItems: "center",
        padding: 40,
        flex: 1
    },
    loginEmail: {
        margin: 8,
        borderColor: "white",
        borderWidth: 0.5,
        fontSize: 18,
        width: 290,
        color: "white"
    },
    loginForm: {
        marginTop: 40
    },
    loginSenha: {
        textDecorationColor: "white",
        margin: 8,
        fontSize: 18,
        borderColor: "white",
        borderWidth: 0.5,
        width: 290,
        color: "white"

    },
    loginEntrar: {
        justifyContent: "center",
        alignItems: "center",
        width: 250,
        margin: 15,
        fontSize: 40,
        height: 45,
        backgroundColor: "#34E3B1",
        width: 290

    },
    loginImg: {
        width: 200,
        height: 200,
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