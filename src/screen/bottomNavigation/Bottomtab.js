import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Principal from './Principal';
import DadosPessoais from './DadosPessoais';
import PlanoAlimentar from './PlanoAlimentar';
import Chat from './Chat';
import Grafico from './Grafico';

const Navegador = createBottomTabNavigator({
  Principal: {
    screen: Principal
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
});
const AppContainer = createAppContainer(Navegador);
export default AppContainer;