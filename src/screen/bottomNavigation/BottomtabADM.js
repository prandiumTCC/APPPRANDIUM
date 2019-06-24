import React, { Component } from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinkPagePrincipal from "../stackNavigationADM/LinkPagePrincipal";
import LinkPagePaciente from "../stackNavigationADM/LinkPagePacientes";
import LinkPageAlimentos from "../stackNavigationADM/LinkPageAlimentos";

//import DadosPessoais from "../stackNavigation/LinkPageDados";
//import PlanoAlimentar from "../stackNavigation/LinkPagePlano";
//import Chat from "../stackNavigation/LinkPageChat";
//import Grafico from "../stackNavigation/LinkPageGrafic";

const Navegador = createBottomTabNavigator(
  {
    Principal: LinkPagePrincipal,
    LinkPagePaciente: LinkPagePaciente,
    LinkPageAlimentos: LinkPageAlimentos
    /*DadosPessoais: DadosPessoais,
    PlanoAlimentar: PlanoAlimentar,
    Chat: Chat,
    Grafico: Grafico*/
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
          icoName = "md-person";
        } else if (routeName === "LinkPagePaciente") {
          icoName = "md-person";
        } else if (routeName === "LinkPageAlimentos") {
          icoName = "md-list";
        } /*else if (routeName === "Chat") {
          icoName = "md-chatbubbles";
        } else if (routeName === "Grafico") {
          icoName = "md-clipboard";
        }*/
        return <IconComponent name={icoName} size={24} color={tintColor} />;
      }
    })
  }
);
const AppContainer = createAppContainer(Navegador);
export default AppContainer;
