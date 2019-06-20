import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import firebase from "../../connection/firebaseConnnection";

class DadosPessoais extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Dados Pessoais",
    headerStyle: {
      backgroundColor: "#444A5A"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      justifyContent: "center"
    },
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut();
          navigation.navigate(`../Login`);
        }}
      >
        <Text style={{ color: "#FFF", marginRight: 10 }}>Sair</Text>
      </TouchableOpacity>
    )
  });

  render() {
    return (
      <View style={styles.fundo}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.viewIMG}>
              <Image
                style={styles.fotoPerfil}
                source={require("../../img/perfil.jpg")}
              />
              <TouchableOpacity style={styles.btnAlterarFoto}>
                <Text style={styles.txtBtn}>ALTERAR FOTO</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ViewScroll}>
              <Text style={styles.titleForm}>Nome</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  autoCorrect={false}
                  placeholder="Digite seu nome"
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
                  autoCorrect={false}
                  keyboardType={"numeric"}
                  placeholder="Digite seu CPF"
                  underlineColorAndroid="transparent"
                />
              </View>
              <Text style={styles.titleForm}>CELULAR</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  autoCorrect={false}
                  keyboardType={"numeric"}
                  placeholder="Digite seu celular"
                  underlineColorAndroid="transparent"
                />
              </View>
              <TouchableOpacity style={styles.btnAlterarDados}>
                <Text style={styles.txtBtn}>ALTERAR DADOS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#444A5A",
    padding: 10
  },
  viewIMG: {
    justifyContent: "center",
    alignItems: "center"
  },
  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 400 / 2
  },
  btnAlterarFoto: {
    backgroundColor: "#839DCA",
    borderRadius: 3,
    height: 44,
    width: 150,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  btnAlterarDados: {
    backgroundColor: "#9DCA83",
    borderRadius: 3,
    height: 44,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  txtBtn: {
    color: "#FFF",
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    padding: 10 * 2
  },
  ViewScroll: {
    justifyContent: "center",
    alignItems: "stretch"
  },
  titleForm: {
    color: "#FFF",
    marginTop: 8,
    marginBottom: 4,
    fontWeight: "bold"
  },
  form: {
    marginTop: 5 * 2
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 20
  }
});
export default DadosPessoais;
