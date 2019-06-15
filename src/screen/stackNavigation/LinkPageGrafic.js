import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Grafico from '../telas/Grafico';

const NavegadorStack = createStackNavigator({
  Grafico: {
    screen: Grafico
  },
  
},{
  // headerMode:''
  headerLayoutPreset:'center'
});
const AppContainer = createAppContainer(NavegadorStack);
export default AppContainer;