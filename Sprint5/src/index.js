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

const ConsultasPacienteNavigator = createStackNavigator(
    {
        pacienteConsulta
    },

);
const ConsultasMedicoNavigator = createStackNavigator(
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
