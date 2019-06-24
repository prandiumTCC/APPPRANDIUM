import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import firebase from "../connection/firebaseConnnection";
import TextInputMask from "react-native-text-input-mask";

// import { Container } from './styles';

export default class CadastroMedico extends Component {
  static navigationOptions = {
    title: "Cadastro Nutricionista",
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
      nome_nutri: "",
      sobrenome_nutri: "",
      cpf_nutri: "",
      sts_nutri: 0,
      celular_nutri: "",
      crn_nutri: "",
      email_nutri: "",
      senha_nutri: "",
      perfil_nutri: 3
    };

    this.cadastarUser = this.cadastarUser.bind(this);

    firebase.auth().signOut();

    firebase.auth().onAuthStateChanged(user => {
      let state = this.state;
      if (user) {
        firebase
          .database()
          .ref("NUTRICIONISTA")
          .child(user.uid)
          .set({
            crn_nutri: state.crn_nutri,
            nome_nutri: state.nome_nutri,
            sobrenome_nutri: state.sobrenome_nutri,
            cpf_nutri: state.cpf_nutri,
            sts_nutri: state.sts_nutri,
            celular_nutri: state.celular_nutri,
            email_nutri: state.email_nutri,
            perfil: state.perfil_nutri,
            useruid: user.uid
          });
        alert("Nutricionista cadastrado com sucesso");
        this.props.navigation.navigate("./bottomNavigation/Bottomtab");
      }
    });
  }
  cadastarUser() {
    Keyboard.dismiss();
    let state = this.state;
    if (state.nome_nutri != isNaN && state.nome_nutri != "") {
      if (state.sobrenome_nutri != isNaN && state.sobrenome_nutri != "") {
        if (state.cpf_nutri.length == 14 && state.cpf_nutri != "") {
          if (state.celular_nutri != isNaN && state.celular_nutri != "") {
            if (state.crn_nutri != isNaN && state.crn_nutri != "") {
              if (state.email_nutri != isNaN && state.email_nutri != "") {
                if (state.senha_nutri != isNaN && state.senha_nutri != "") {
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                      this.state.email_nutri,
                      this.state.senha_nutri
                    )
                    .catch(error => {
                      switch (error.code) {
                        case `auth/weak-password`:
                          alert("Senha deve conter mais de 6 caracteres");
                          break;

                        default:
                          alert(error.code + "/" + error.message);
                          break;
                      }
                    });
                } else {
                  alert("Preencha campo Senha");
                }
              } else {
                alert("Preencha campo E-mail");
              }
            } else {
              alert("Preencha campo CRN");
            }
          } else {
            alert("Preencha campo celular");
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

    this.props.navigation.navigate("Home");
  }

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
                placeholder="Digite seu primeiro nome"
                underlineColorAndroid="transparent"
                onChangeText={nome_nutri => this.setState({ nome_nutri })}
                value={this.state.nome_nutri}
              />
            </View>
            <Text style={styles.titleForm}>Sobrenome</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                placeholder="Digite seu sobrenome"
                underlineColorAndroid="transparent"
                onChangeText={sobrenome_nutri =>
                  this.setState({ sobrenome_nutri })
                }
                value={this.state.sobrenome_nutri}
              />
            </View>
            <Text style={styles.titleForm}>CPF</Text>
            <View style={styles.form}>
              <TextInputMask
                style={styles.input}
                keyboardType={"numeric"}
                placeholder="Digite seu CPF"
                autoCorrect={false}
                value={this.state.cpf_nutri}
                underlineColorAndroid="transparent"
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={cpf_nutri => this.setState({ cpf_nutri })}
                mask={"[000].[000].[000]-[00]"}
              />
            </View>
            <Text style={styles.titleForm}>Celular</Text>
            <View style={styles.form}>
              <TextInputMask
                style={styles.input}
                keyboardType={"numeric"}
                autoCorrect={false}
                value={this.state.celular_nutri}
                placeholder="Digite seu celular"
                underlineColorAndroid="transparent"
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={celular_nutri => {
                  this.setState({ celular_nutri });
                }}
                mask={"([00]) [0] [0000]-[0000]"}
              />
            </View>
            <Text style={styles.titleForm}>CRN</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                keyboardType={"name-phone-pad"}
                autoCorrect={false}
                placeholder="Digite seu CRN"
                underlineColorAndroid="transparent"
                onChangeText={crn_nutri => this.setState({ crn_nutri })}
                value={this.state.crn_nutri}
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
                onChangeText={email_nutri => this.setState({ email_nutri })}
                value={this.state.email_nutri}
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
                onChangeText={senha_nutri => this.setState({ senha_nutri })}
                value={this.state.senha_nutri}
              />
            </View>
            <TouchableOpacity
              style={styles.btnLogar}
              onPress={this.cadastarUser}
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
