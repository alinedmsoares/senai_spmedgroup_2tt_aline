import {
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from "react-navigation";

import App from '../App'
import Login from "../src/pages/login"

const AuthStack = createStackNavigator({Login});

const ConsultasNavigator = createBottomTabNavigator(
    {
        App
    },
    {
        initialRouteName: "App",
        swipeEnabled: true,
        tabBarOptions:{
            showLabel:false,
            showIcon:true,
            inactiveBackgroundColor: "#dd99ff",
            activeBackgroundColor: "#1D0E3F",
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "#FFFFFF",
            style: {
                height: 50
            }
        }
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            ConsultasNavigator,
            AuthStack
        },
        {
            initialRouteName: "AuthStack"
        }
    )
)
