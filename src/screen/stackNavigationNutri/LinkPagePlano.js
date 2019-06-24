import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PlanoAlimentar from '../telas/PlanoAlimentar';

const NavegadorStack = createStackNavigator({
  Plano: {
    screen: PlanoAlimentar
  },
  
},{
  // headerMode:''
  headerLayoutPreset:'center'
});
const AppContainer = createAppContainer(NavegadorStack);
export default AppContainer;