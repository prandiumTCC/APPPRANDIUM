import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert
} from "react-native";
import firebase from "../connection/firebaseConnnection";

export default class RecPSW extends Component {
  static navigationOptions = {
    title: "Recuperar senha",
    headerStyle: {
      backgroundColor: "#444A5A"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      emailRec: ""
    };
    this.enviarEmail = this.enviarEmail.bind(this);
    firebase.auth().signOut();
  }
  enviarEmail = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.emailRec)
      .then(
        () => {
          Alert.alert("Solicitação de redefinicao de senha enviada!!!");
          Keyboard.dismiss();
        },
        error => {
          switch (error.code) {
            case `auth/user-not-found`:
              alert("Email não corresponde ao o email cadastrado na base");
              break;
            case `auth/invalid-email`:
              alert(
                "O Endereço de email tem que esta no formato padrão ex:exemplo@gmail.com"
              );
              break;
            default:
              alert("Error: " + error.code + " / " + error.message);
              break;
          }
        }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleForm}>E-mail</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            value={this.state.emailRec}
            placeholder="Digite seu e-mail"
            underlineColorAndroid="transparent"
            keyboardType={"email-address"}
            onChangeText={emailRec => this.setState({ emailRec })}
          />
        </View>
        <TouchableOpacity style={styles.btnLogar} onPress={this.enviarEmail}>
          <Text style={styles.txtBtn}>{"enviar".toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444A5A",
    padding: 20 * 2,
    justifyContent: "center",
    alignItems: "stretch"
  },
  titleForm: {
    color: "#FFF",
    marginTop: 8,
    fontWeight: "bold"
  },
  form: {
    marginTop: 10 * 2
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
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    marginTop: 10 * 2
  },
  txtBtn: {
    color: "#FFF",
    fontWeight: "bold"
  }
});
