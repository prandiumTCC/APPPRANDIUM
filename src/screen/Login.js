import React, { Component } from "react";
import firebase from "../connection/firebaseConnnection";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";
import Modal from "react-native-modal";
export default class Login extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      email: "",
      senha: "",
      uid: ""
    };
    this.logar = this.logar.bind(this);
    this.cadastroM = this.cadastroM.bind(this);
    this.cadastroP = this.cadastroP.bind(this);
    this.telaRec = this.telaRec.bind(this);

    firebase.auth().signOut();
  }
  closeKeyBord = () => {
    Keyboard.dismiss();
  };
  logar = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let state = this.state;
        state.uid = user.uid;
        this.setState(state);
        firebase
          .database()
          .ref("PACIENTE")
          .child(user.uid)
          .once("value")
          .then(snapshot => {
            this.props.navigation.navigate("./telas/Principal");
          });
        this.closeKeyBord();
      }
    });

    let state = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.senha)
      .catch(error => {
        switch (error.code) {
          case `auth/wrong-password`:
            alert("Senha incorreta");
            break;
          case `auth/user-dissable`:
            alert("Seu usuario foi desabilitado");
            break;
          case `auth/invalid-email`:
            alert("Email invalido");
            break;
          case `auth/network-request-failed`:
            alert("Email invalido");
            break;
          case `auth/user-not-found`:
            alert("Usuário nao corresponde ao cadastrado na base");
            break;
          default:
            // alert("tente novamente mais tarde");
            alert("Error: " + error.code + " / " + error.message);
            break;
        }
      });
  };
  cadastroP = () => {
    this.closeKeyBord();
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate("CadastroPaciente");
  };
  cadastroM = () => {
    this.closeKeyBord();
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate("CadastroMedico");
  };

  telaRec = () => {
    //alert('apertou');
    this.props.navigation.navigate("RecPSW");
  };
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.titleForm}>E-mail</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            placeholder="Digite seu e-mail"
            keyboardType={"email-address"}
            value={this.state.email}
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <Text style={styles.titleForm}>Senha</Text>
        <View tyle={styles.form}>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            autoCorrect={false}
            value={this.state.senha}
            placeholder="Digite sua senha"
            underlineColorAndroid="transparent"
            onChangeText={senha => this.setState({ senha })}
          />
          <TouchableOpacity style={styles.rdfPsw} onPress={this.telaRec}>
            <Text style={styles.titlePsw}>Redefinir senha </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnLogar} onPress={this.logar}>
          <Text style={styles.txtBtn}>{"Logar".toLocaleUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCad} onPress={this.toggleModal}>
          <Text>{"Cadastro".toUpperCase()}</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalFundo}>
            <TouchableOpacity
              onPress={this.toggleModal}
              style={styles.btnModalClose}
            >
              <Text style={styles.elementClose}>X</Text>
            </TouchableOpacity>
            <View style={styles.titleModal}>
              <Text style={styles.txtModal}>
                {"tipo de cadastro".toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity style={styles.btnCadM} onPress={this.cadastroM}>
              <Text style={styles.txtBtn}>
                {"Cadastro Nutricionista".toUpperCase()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCadP} onPress={this.cadastroP}>
              <Text style={styles.txtBtn}>
                {"Cadastro paciente".toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    marginBottom: 8,
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
  rdfPsw: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "transparent"
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
  },
  modalFundo: {
    backgroundColor: "#FFF",
    borderRadius: 3,
    padding: 10
  },
  btnModalClose: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "transparent"
  },
  elementClose: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18
  },
  titleModal: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  txtModal: {
    fontWeight: "bold"
  },
  btnCadM: {
    backgroundColor: "#839DCA",
    borderRadius: 3,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF"
  },
  btnCadP: {
    backgroundColor: "#9DCA83",
    borderRadius: 3,
    height: 44,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF"
  }
});
