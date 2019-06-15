import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import DadosPessoais from '../telas/DadosPessoais';

const NavegadorStack = createStackNavigator({
  Pessoais: {
    screen: DadosPessoais
  },
  
},{
  // headerMode:''
  headerLayoutPreset:'center'
});
const AppContainer = createAppContainer(NavegadorStack);
export default AppContainer;