import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import firebase from "../connection/firebaseConnnection";
import { StackActions, NavigationActions } from "react-navigation";
export default class Preload extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};

    // firebase.auth().signOut();
  }
  componentDidMount = () => {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // const resetAction = StackActions.reset({
          //   index: 0,
          //   actions: [
          //     NavigationActions.navigate({
          //       routeName: "../screen/telas/Principal"
          //     })
          //   ]
          // });
          // this.props.navigation.dispatch(resetAction);
          this.props.navigation.navigate("Bottomtab");
        } else {
          // const resetAction = StackActions.reset({
          //   index: 0,
          //   actions: [NavigationActions.navigate({ routeName: "Login" })]
          // });
          // this.props.navigation.dispatch(resetAction);
          this.props.navigation.navigate("Login");
        }
      });
    }, 5000);
  };

  render() {
    return (
      <View style={styles.splash}>
        <Text style={styles.title}>PRANDIUM</Text>
        <Text style={styles.titlePsw}>Planejamento nutricional</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20 * 2,
    justifyContent: "center",
    alignItems: "center"
  },
  titlePsw: {
    color: "#FFF"
  },
  title: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold"
  }
});
