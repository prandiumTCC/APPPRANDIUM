import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import CadastroAlimento from '../telas/CadastroAlimento';

const NavegadorStack = createStackNavigator({
  CadastroAlimento: {
    screen: CadastroAlimento
  },

}, {
    // headerMode:''
    headerLayoutPreset: 'center'
  });
const AppContainer = createAppContainer(NavegadorStack);
export default AppContainer;