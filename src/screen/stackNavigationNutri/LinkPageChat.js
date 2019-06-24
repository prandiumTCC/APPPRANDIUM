import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Chat from '../telas/Chat';

const NavegadorStack = createStackNavigator({
  Chat: {
    screen: Chat
  },
  
},{
  // headerMode:''
  headerLayoutPreset:'center'
});
const AppContainer = createAppContainer(NavegadorStack);
export default AppContainer;