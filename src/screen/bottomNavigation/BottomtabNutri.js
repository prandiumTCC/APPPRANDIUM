import React, { Component } from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinkPagePrincipal from "../stackNavigation/LinkPagePrincipal";
import DadosPessoais from "../stackNavigation/LinkPageDados";
import PlanoAlimentar from "../stackNavigation/LinkPagePlano";
import Chat from "../stackNavigation/LinkPageChat";
import Grafico from "../stackNavigation/LinkPageGrafic";

const Navegador = createBottomTabNavigator(
  {
    Principal: LinkPagePrincipal,
    DadosPessoais: DadosPessoais,
    PlanoAlimentar: PlanoAlimentar,
    Chat: Chat,
    Grafico: Grafico
  },
  {
    initialRouteName: "Principal",
    tabBarOptions: {
      activeTintColor: "#000",
      inactiveTintColor: "#ccc",
      showLabel: false
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let icoName;

        if (routeName === "Principal") {
          icoName = "md-home";
        } else if (routeName === "DadosPessoais") {
          icoName = "md-person";
        } else if (routeName === "PlanoAlimentar") {
          icoName = "md-list";
        } else if (routeName === "Chat") {
          icoName = "md-chatbubbles";
        } else if (routeName === "Grafico") {
          icoName = "md-clipboard";
        }
        return <IconComponent name={icoName} size={24} color={tintColor} />;
      }
    })
  }
);
const AppContainer = createAppContainer(Navegador);
export default AppContainer;
