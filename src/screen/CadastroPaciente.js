import React, { Component } from 'react';

import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,Keyboard } from 'react-native';

export default class CadastroPaciente extends Component {

  static navigationOptions = {
    title: "Cadastro Paciente",
    headerStyle: {
      backgroundColor: '#444A5A',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props) {
    super(props);
    this.state={}
  }
  cadastarUser(){
    Keyboard.dismiss();
    this.props.navigation.navigate("Home");
  }

  render() {

    return <View>
      <ScrollView >
        <View style={styles.container}>
          <Text style={styles.titleForm}>Nome</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="Digite seu primeiro nome"
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={styles.titleForm}>Sobrenome</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="Digite seu sobrenome"
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={styles.titleForm}>CPF</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              keyboardType={"numeric"}
              autoCorrect={false}
              placeholder="Digite seu CPF"
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={styles.titleForm}>Data Nascimento</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              keyboardType={"numeric"}
              autoCorrect={false}
              placeholder="Digite sua data de nascimento"
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={styles.titleForm}>E-mail</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              keyboardType={"email-address"}
              autoCorrect={false}
              placeholder="Digite seu Email"
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
          </View>
          <TouchableOpacity style={styles.btnLogar} onPress={this.cadastarUser}>
            <Text style={styles.txtBtn} >Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444A5A",
    padding: 10 * 2,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  titleForm: {
    color: "#FFF",
    marginTop: 8,
    fontWeight: 'bold'
  },
  form: {
    marginTop: 10 * 2,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 20,
    marginBottom: 8,
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
  }
});