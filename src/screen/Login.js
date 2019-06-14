import React, { Component } from 'react';

import { View, Text, StyleSheet, TextInput, TouchableOpacity,Keyboard } from 'react-native';

// import { Container } from './styles';

export default class Login extends Component {

  static navigationOptions = {

    title: null,
    header: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      // modalVisible:false
    }
    this.logar = this.logar.bind(this);
    this.cadastro = this.cadastro.bind(this);

  }


  logar() {
    Keyboard.dismiss();
    this.props.navigation.navigate("Bottomtab");
  }
  cadastro() {
    Keyboard.dismiss();
    this.props.navigation.navigate("CadastroMedico");
  }


  render() {

    return <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.titleForm}>E-mail</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder="Digite seu e-mail"
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.titleForm}>Senha</Text>
      <View tyle={styles.form}>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          autoCorrect={false}
          placeholder="Digite sua senha"
          underlineColorAndroid="transparent"
        />
        <View style={styles.rdfPsw}>
          <Text style={styles.titlePsw}>Redefinir senha</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnLogar} onPress={this.logar}>
        <Text style={styles.txtBtn} >Logar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnCad} onPress={this.cadastro}>
        <Text>Cadastro</Text>
      </TouchableOpacity>

    </View>;
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
  rdfPsw: {
    marginTop: 10,
    marginBottom: 10,

  },
  titlePsw: {
    color: "#FFF",
  },
  title: {
    textAlign: 'center',
    color: "#FFF",
    fontSize: 24,
    fontWeight: 'bold',
  },
  btnLogar: {
    backgroundColor: "#9DCA83",
    borderRadius: 3,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    color: "#FFF",
  },
  btnCad: {
    backgroundColor: "#ffee58",
    borderRadius: 3,
    height: 44,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {
    color: "#FFF",
  },

});