import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import  Preload from './src/screen/Preload';
import  Login from './src/screen/Login';
import  Bottomtab  from './src/screen//bottomNavigation/Bottomtab';
import  CadastroPaciente  from './src/screen/CadastroPaciente';
import CadastroMedico from './src/screen/CadastroMedico';

const navigation = createStackNavigator({
  Preload:{
    screen:Preload
  },
  Login:{
    screen:Login
  },
  Bottomtab:{
    screen:Bottomtab
  },
  CadastroPaciente:{
    screen:CadastroPaciente
  },
  CadastroMedico:{
    screen:CadastroMedico
  }
})

const Appcontainer = createAppContainer(navigation);
export default Appcontainer; 
