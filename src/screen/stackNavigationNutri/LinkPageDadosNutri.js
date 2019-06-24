import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import DadosPessoaisNutri from '../telas/DadosPessoaisNutri';

const NavegadorStack = createStackNavigator({
  Pessoais: {
    screen: DadosPessoaisNutri
  },

}, {
    headerLayoutPreset: 'center'
  });
const AppContainer = createAppContainer(NavegadorStack);
export default AppContainer;