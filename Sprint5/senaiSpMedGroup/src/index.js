import {
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from "react-navigation";

import pacienteConsulta from '../src/pages/pacienteConsulta'
import medicoConsulta from '../src/pages/medicoConsulta'
import Login from "../src/pages/login"

const AuthStack = createStackNavigator({Login});

const ConsultasPacienteNavigator = createBottomTabNavigator(
    {
        pacienteConsulta
    },

);
const ConsultasMedicoNavigator = createBottomTabNavigator(
    {
        medicoConsulta
    },

);

export default createAppContainer(
    createSwitchNavigator(
        {
            ConsultasPacienteNavigator,
            ConsultasMedicoNavigator,
            AuthStack
        },
        {
            initialRouteName: "AuthStack"
        }
    )
)
