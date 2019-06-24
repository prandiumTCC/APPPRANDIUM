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

export default class Mensagens extends Component {
  constructor(props) {
    super(props);
    this.back = styles.balaoEsqueda;

    /*if (this.props.data.uid == this.props.UID) {
      this.back = styles.balaoDireita;
    }*/
  }
  render() {
    return (
      <View style={[styles.area, null]}>
        <Text>{this.props.UID}</Text>
        <Text style={styles.dataTxt}></Text>
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
