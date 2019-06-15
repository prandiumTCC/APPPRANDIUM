import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Grafico extends Component {
  
  static navigationOptions = {
    title: "Gráfico",
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
        <Text>Tela 5</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
 
});
export default Grafico;