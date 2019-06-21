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
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

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
  constructor(props) {
    super(props);
    this.state = {
      foto: null,
      uid: ""
    };
    console.disableYellowBox = true;
    this.getPhoto = this.getPhoto.bind(this);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let state = this.state;
        state.uid = user.uid;
        this.setState(state);
        alert(this.state.uid);
      } else {
        firebase.auth().signOut();
      }
    });
  }
  getPhoto = () => {
    let option = {
      title: "Selecione uma das opções para foto"
    };
    ImagePicker.showImagePicker(option, r => {
      if (r.uri) {
        let uri = r.uri.replace("file://", "");
        let imagem = firebase
          .storage()
          .ref()
          .child("IMG_PACIENTE")
          .child(this.state.uid);
        let mime = "image/jpeg";

        RNFetchBlob.fs
          .readFile(uri, "base64")
          .then(data => {
            return RNFetchBlob.polyfill.Blob.build(data, {
              type: mime + ";BASE64"
            });
          })
          .then(blob => {
            imagem
              .put(blob, { contentType: mime })
              .then(() => {
                blob.close();
                alert("Terminou processo");
                // let url = imagem.getDownloadURL();
              })
              .catch(error => {
                alert("Fudeu: " + error.code + " / " + error.message);
              });
          });
        let foto = { uri: r.uri };
        let state = this.state;
        state.foto = foto;
        this.setState(state);
      }
    });
  };

  render() {
    return (
      <View style={styles.fundo}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.viewIMG}>
              <Image style={styles.fotoPerfil} source={this.state.foto} />
              <TouchableOpacity
                style={styles.btnAlterarFoto}
                onPress={this.getPhoto}
              >
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
