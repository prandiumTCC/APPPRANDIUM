import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  BackHandler
} from "react-native";
import firebase from "../../connection/firebaseConnnection";
import Ionicons from "react-native-vector-icons/Ionicons";
import Conversa from "./Conversa";

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Chat",
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
        <Ionicons
          name={"md-log-out"}
          size={24}
          color={"#FFF"}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      contatoNutri: [],
      uid: "",
      actionChat: "",
      nomeUser: "",
      sobrenomeUser: ""
    };

    this.clickNutri = this.clickNutri.bind(this);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let state = this.state;
        state.uid = user.uid;
        this.setState(state);
      } else {
        firebase.auth().signOut();
      }
    });

    firebase
      .database()
      .ref("NUTRICIONISTA")
      .once("value")
      .then(snapshot => {
        let state = this.state;
        state.contatoNutri = [];
        snapshot.forEach(element => {
          state.contatoNutri.push({
            key: element.key,
            nome: element.val().nome_nutri,
            sobrenome: element.val().sobrenome_nutri,
            crn: element.val().crn_nutri
          });
        });
        this.setState(state);
      });
  }
  flatContaotoNutri(item) {
    return (
      <TouchableHighlight
        style={styles.cxNutricionista}
        onPress={() => this.clickNutri(item)}
      >
        <View style={styles.boxNutri}>
          <View style={styles.fotoNutri}>
            <Image
              style={styles.img}
              source={require("../../img/perfil.jpg")}
            />
          </View>
          <View style={styles.dadosNutri}>
            <Text style={styles.infoNutri}>
              Nome: {item.nome} {item.sobrenome}
            </Text>
            <Text style={styles.infoNutri}>CRN: {item.crn}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  clickNutri = item => {
    // alert(
    //   "id: " + item.key + " / " + "nome: " + item.nome + " " + item.sobrenome
    // );

    // criando o proprio CHAT
    let newChat = firebase
      .database()
      .ref("CHAT")
      .push();
    newChat
      .child("MEMBERS")
      .child(this.state.uid)
      .set({
        id: this.state.uid
      });
    newChat
      .child("MEMBERS")
      .child(item.key)
      .set({
        id: item.key
      });
    // associando aos envolvidos
    let chatId = newChat.key;
    // pegando nome do usuario ativo
    firebase
      .database()
      .ref("PACIENTE")
      .child(this.state.uid)
      .once("value")
      .then(snapshot => {
        let state = this.state;
        state.nomeUser = snapshot.val().nome_paciente;
        state.sobrenomeUser = snapshot.val().sobrenome_paciente;
        this.setState(state);
        // set no chat dentro do no usuario
        firebase
          .database()
          .ref("NUTRICIONISTA")
          .child(item.key)
          .child("chats")
          .child(chatId)
          .set({
            id: chatId,
            titulo: this.state.nomeUser
          });
      });
    // set no chat dentro do no usuario
    firebase
      .database()
      .ref("PACIENTE")
      .child(this.state.uid)
      .child("chats")
      .child(chatId)
      .set({
        id: chatId,
        titulo: item.nome + " " + item.sobrenome
      });
    let state = this.state;
    state.actionChat = chatId;
    this.setState(state);
  };
  componentDidUpdate = () => {
    if (this.state.actionChat != "") {
      this.props.navigation.navigate("Conversa");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <TouchableHighlight
            onPress={() => null}
            activeOpacity={0.4}
            underlayColor="transparent"
            style={styles.buttonOn}
          >
            <Text style={styles.txtButton}>CONTATOS</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("Conversa")}
            activeOpacity={0.4}
            underlayColor="transparent"
          >
            <Text style={styles.txtButton}>CONVERSAS</Text>
          </TouchableHighlight>
        </View>
        <FlatList
          horizontal={false}
          data={this.state.contatoNutri}
          renderItem={({ item }) => this.flatContaotoNutri(item)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444A5A"
  },
  buttons: {
    height: 50,
    backgroundColor: "#839DCA",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10
  },
  buttonOn: {
    borderBottomWidth: 0.5,
    borderColor: "#FFF"
  },
  txtButton: {
    color: "#FFF",
    fontSize: 15
  },
  cxNutricionista: {
    flex: 7,
    padding: 10
  },
  boxNutri: {
    backgroundColor: "#FFF",
    height: 100,
    borderRadius: 5,
    flexDirection: "row",
    padding: 10
  },
  fotoNutri: {
    width: 80,
    height: 80,
    borderRadius: 40,
    flex: 1
  },
  dadosNutri: {
    justifyContent: "center",
    flex: 2
  },
  infoNutri: {
    fontWeight: "bold"
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 400 / 2
  }
});
export default Chat;
