import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';

export default class RecPSW extends Component {

  static navigationOptions = {
    title: "Recuperar senha",
    headerStyle: {
      backgroundColor: '#444A5A',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props){
    super(props);
    this.state={}
    this.enviarEmail = this.enviarEmail.bind(this);
  }
  enviarEmail(){
    Keyboard.dismiss();
    this.props.navigation.navigate("Login");
  }

  render() {
    return <View styles={styles.container}>
      <Text style={styles.titleForm}>E-mail</Text>
      <View tyle={styles.form}>
        <TextInput
          keyboardType={"email-address"}
          style={styles.input}
          autoCorrect={false}
          placeholder="Digite seu email"
          underlineColorAndroid="transparent"
        />
        <View style={styles.rdfPsw}>
          <Text style={styles.titlePsw}>Redefinir senha</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnLogar} onPress={this.logar}>
        <Text style={styles.txtBtn}>{'enviar'.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444A5A",
    padding: 20 * 2,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  titleForm: {
    color: "#FFF",
    marginTop: 8,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  form: {
    marginTop: 10 * 2,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 20
  },
  btnLogar: {
    backgroundColor: "#9DCA83",
    borderRadius: 3,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    color: "#FFF",
  }
});