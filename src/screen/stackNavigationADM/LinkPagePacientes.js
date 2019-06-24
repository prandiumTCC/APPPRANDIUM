import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PlanoPaciente from '../telas/PrincipalPaciente';

const NavegadorStack = createStackNavigator({
  PlanoPaciente: {
    screen: PlanoPaciente
  },

}, {
    // headerMode:''
    headerLayoutPreset: 'center'
  });
const AppContainer = createAppContainer(NavegadorStack);
export default AppContainer;