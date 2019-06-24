import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Principal from '../telas/PrincipalADM';


const NavegadorStack = createStackNavigator({
  Principal: {
    screen: Principal,
  },
}, {
    headerLayoutPreset: 'center'
  });
const AppContainer = createAppContainer(NavegadorStack);
export default AppContainer;