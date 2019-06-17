import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import  Preload from './src/screen/Preload';
import  Login from './src/screen/Login';
import RecPSW from './src/screen/RecPSW';
import  Bottomtab  from './src/screen/bottomNavigation/Bottomtab';
import  CadastroPaciente  from './src/screen/CadastroPaciente';
import CadastroMedico from './src/screen/CadastroMedico';

const Appcontainer = createStackNavigator({
  Preload:{
    screen:Preload
  },
  Login:{
    screen:Login
  },
  RecPSW: {
    screen: RecPSW
  },
  Bottomtab:{
    screen:Bottomtab,
    navigationOptions: {
      title: null,
      header: null
    }
  },
  CadastroPaciente:{
    screen:CadastroPaciente
  },
  CadastroMedico:{
    screen:CadastroMedico
  }
})

export default createAppContainer(Appcontainer);