import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class PlanoAlimentar extends Component {
  
  static navigationOptions = {
    title: "Plano",
    headerStyle: {
      backgroundColor: '#444A5A',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent:'center'
    },
    headerRight:(
      <Text style={{color:'#FFF', marginRight:10}}>Sair</Text>
    )
  };

  render(){
    return(
      <View>
        <Text>Tela 3</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({

});
export default PlanoAlimentar;