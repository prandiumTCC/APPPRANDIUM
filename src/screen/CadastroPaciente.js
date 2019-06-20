import React, { Component } from "react";
import firebase from "../connection/firebaseConnnection";
import TextInputMask from "react-native-text-input-mask";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard
} from "react-native";

export default class CadastroPaciente extends Component {
  static navigationOptions = {
    title: "Cadastro Paciente",
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
      nome_paciente: "",
      sobrenome_paciente: "",
      cpf_paciente: "",
      dataNasc_paciente: "",
      celular_paciente: "",
      email_paciente: "",
      senha_paciente: "",
      perfil_paciente: 2
    };

    this.validarCampos = this.validarCampos.bind(this);

    firebase.auth().signOut();

    firebase.auth().onAuthStateChanged(user => {
      let state = this.state;
      if (user) {
        firebase
          .database()
          .ref("PACIENTE")
          .child(user.uid)
          .set({
            nome_paciente: state.nome_paciente,
            sobrenome_paciente: state.sobrenome_paciente,
            cpf_paciente: state.cpf_paciente,
            dataNasc_paciente: state.dataNasc_paciente,
            celular_paciente: state.celular_paciente,
            email_paciente: state.email_paciente,
            perfil_paciente: state.perfil_paciente
          });
        alert("Paciente cadastrado com sucesso");
        this.props.navigation.navigate("./bottomNavigation/Bottomtab");
      }
    });
  }
  validarCampos = () => {
    Keyboard.dismiss();
    let state = this.state;
    if (state.nome_paciente != isNaN && state.nome_paciente != "") {
      if (state.sobrenome_paciente != isNaN && state.sobrenome_paciente != "") {
        if (state.cpf_paciente.length == 14 && state.cpf_paciente != "") {
          if (
            state.dataNasc_paciente.length == 10 &&
            state.dataNasc_paciente != ""
          ) {
            if (
              state.celular_paciente != isNaN &&
              state.celular_paciente != ""
            ) {
              if (state.email_paciente != isNaN && state.email_paciente != "") {
                if (
                  state.senha_paciente != isNaN &&
                  state.senha_paciente != ""
                ) {
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                      this.state.email_paciente,
                      this.state.senha_paciente
                    )
                    .catch(error => {
                      alert(error.code + "/" + error.message);
                    });
                } else {
                  alert("Preencha campo Senha");
                }
              } else {
                alert("Preencha campo E-mail");
              }
            } else {
              alert("Preencha campo celular");
            }
          } else {
            alert("Preencha campo Data de nascimento");
          }
        } else {
          alert("Preencha campo CPF");
        }
      } else {
        alert("Preencha campo Sobrenome");
      }
    } else {
      alert("Preencha campo nome");
    }
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.titleForm}>Nome</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                value={this.state.nome_paciente}
                placeholder="Digite seu primeiro nome"
                underlineColorAndroid="transparent"
                onChangeText={nome_paciente => this.setState({ nome_paciente })}
              />
            </View>
            <Text style={styles.titleForm}>Sobrenome</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                value={this.state.sobrenome_paciente}
                placeholder="Digite seu sobrenome"
                underlineColorAndroid="transparent"
                onChangeText={sobrenome_paciente =>
                  this.setState({ sobrenome_paciente })
                }
              />
            </View>
            <Text style={styles.titleForm}>CPF</Text>
            <View style={styles.form}>
              <TextInputMask
                style={styles.input}
                keyboardType={"numeric"}
                value={this.state.cpf_paciente}
                placeholder="Digite seu CPF"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={cpf_paciente => {
                  this.setState({ cpf_paciente });
                }}
                mask={"[000].[000].[000]-[00]"}
              />
            </View>
            <Text style={styles.titleForm}>Data Nascimento</Text>
            <View style={styles.form}>
              <TextInputMask
                style={styles.input}
                keyboardType={"numeric"}
                autoCorrect={false}
                value={this.state.dataNasc_paciente}
                placeholder="Digite sua data de nascimento"
                underlineColorAndroid="transparent"
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={dataNasc_paciente => {
                  this.setState({ dataNasc_paciente });
                }}
                mask={"[00]/[00]/[0000]"}
              />
            </View>
            <Text style={styles.titleForm}>Celular</Text>
            <View style={styles.form}>
              <TextInputMask
                style={styles.input}
                keyboardType={"numeric"}
                autoCorrect={false}
                value={this.state.celular_paciente}
                placeholder="Digite seu celular"
                underlineColorAndroid="transparent"
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={celular_paciente => {
                  this.setState({ celular_paciente });
                }}
                mask={"([00]) [0] [0000]-[0000]"}
              />
            </View>
            <Text style={styles.titleForm}>E-mail</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                keyboardType={"email-address"}
                autoCorrect={false}
                value={this.state.email_paciente}
                placeholder="Digite seu Email"
                underlineColorAndroid="transparent"
                onChangeText={email_paciente =>
                  this.setState({ email_paciente })
                }
              />
            </View>
            <Text style={styles.titleForm}>Senha</Text>
            <View tyle={styles.form}>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                autoCorrect={false}
                value={this.state.senha_paciente}
                placeholder="Digite sua senha"
                underlineColorAndroid="transparent"
                onChangeText={senha_paciente =>
                  this.setState({ senha_paciente })
                }
              />
            </View>
            <TouchableOpacity
              style={styles.btnLogar}
              onPress={this.validarCampos}
            >
              <Text style={styles.txtBtn}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444A5A",
    padding: 10 * 2,
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
    paddingHorizontal: 20,
    marginBottom: 8
  },
  rdfPsw: {
    marginTop: 10,
    marginBottom: 10
  },
  titlePsw: {
    color: "#FFF"
  },
  title: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold"
  },
  btnLogar: {
    backgroundColor: "#9DCA83",
    borderRadius: 3,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF"
  },
  btnCad: {
    backgroundColor: "#ffee58",
    borderRadius: 3,
    height: 44,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  txtBtn: {
    color: "#FFF"
  }
});
