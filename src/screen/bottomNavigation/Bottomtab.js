import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import LinkPagePrincipal from '../stackNavigation/LinkPagePrincipal';
import DadosPessoais from '../stackNavigation/LinkPageDados';
import PlanoAlimentar from '../stackNavigation/LinkPagePlano';
import Chat from '../stackNavigation/LinkPageChat';
import Grafico from '../stackNavigation/LinkPageGrafic';

const Navegador = createBottomTabNavigator({
  Principal: {
    screen: LinkPagePrincipal,
  },
  DadosPessoais: {
    screen: DadosPessoais
  },
  PlanoAlimentar: {
    screen: PlanoAlimentar
  },
  Chat: {
    screen: Chat
  },
  Grafico: {
    screen: Grafico
  },
}, {
    initialRouteName: 'Principal',
    tabBarOptions: {
      showIcon: false,
      showLabel:true
    }
  });
const AppContainer = createAppContainer(Navegador);
export default AppContainer;