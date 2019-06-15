import React, {Component} from 'react';
import {View, Text,Image, StyleSheet} from 'react-native';

class Chat extends Component {
  
  static navigationOptions = {
    title: "Chat",
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
        <Text>Tela 4</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#444A5A"
  },
});
export default Chat;