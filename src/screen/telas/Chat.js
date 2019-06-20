import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import firebase from "../../connection/firebaseConnnection";
import Conversa from "./Conversa";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
        <Text style={{ color: "#FFF", marginRight: 10 }}>Sair</Text>
      </TouchableOpacity>
    )
  });

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
        <View style={styles.cxNutricionista}>
          <View style={styles.boxNutri}>
            <View style={styles.fotoNutri}>
              <Image
                style={styles.img}
                source={require("../../img/perfil.jpg")}
              />
            </View>
            <View style={styles.dadosNutri}>
              <Text style={styles.infoNutri}>Nome: Thompson S.</Text>
              <Text style={styles.infoNutri}>CRN: DF-0000x</Text>
            </View>
          </View>
        </View>
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
