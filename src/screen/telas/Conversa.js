import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  FlatList
} from "react-native";
import firebase from "../../connection/firebaseConnnection";
import Ionicons from "react-native-vector-icons/Ionicons";

import Mensagens from "./Mensagens";

export default class Conversa extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Conversa",
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
      bgColor: styles.balaoEsqueda,
      uid: "",
      tmpMsg: [
        { key: 1, date: "2019-01-01 23:58", uid: 123, m: "oi , blz?" },
        {
          key: 2,
          date: "2019-01-01 23:58",
          uid: "1aTnOL2eNoRopvFh24bSOrpLLZ33",
          m: "oi , blz e vc?"
        },
        { key: 3, date: "2019-01-01 23:58", uid: 123, m: "blz" }
      ]
    };


    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let state = this.state;
        state.uid = user.uid;
        this.setState(state);
        this.UID = this.state.uid;
        firebase.database().ref('PACIENTE').child(this.state.uid).once('value').then((snapshot) => {
          this.UID = snapshot.val().useruid;
        })
      } else {
        firebase.auth().signOut();
      }
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.chatArea}
          data={this.state.tmpMsg}
          renderItem={({ item }) =>
            <Mensagens UID={this.UID} />
          }
        />
        <View style={styles.sendArea}>
          <TextInput style={styles.sendInput} />
          <TouchableHighlight style={styles.sendButton}>
            <Ionicons
              name={"md-send"}
              size={40}
              color={"#839DCA"}
              style={{ marginRight: 10 }}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  chatArea: {
    flex: 1,
    backgroundColor: "#CCC"
  },
  sendArea: {
    height: 50,
    backgroundColor: "#EEE",
    flexDirection: "row"
  },
  sendInput: {
    height: 50,
    flex: 1,
    marginLeft: 10
  },
  sendButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignContent: "center"
  },
  area: {
    margin: 10,
    backgroundColor: "#999",
    padding: 10,
    borderRadius: 5,
    maxWidth: "80%"
  },
  dataTxt: {
    fontSize: 11,
    textAlign: "right"
  },
  balaoEsqueda: {
    backgroundColor: "#FFF",
    alignSelf: "flex-start"
  },
  balaoDireita: {
    backgroundColor: "red",
    alignSelf: "flex-end"
  }
});
