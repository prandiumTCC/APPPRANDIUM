import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import firebase from '../connection/firebaseConnnection';



export default class Preload extends Component {

  static navigationOptions = {
    title: null,
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {}

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Home',);
      } else {
        this.props.navigation.navigate('Login');
      }
    })
  }

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
    justifyContent: 'center',
    alignItems: 'center'
  },
  titlePsw: {
    color: "#FFF",
  },
  title: {
    textAlign: 'center',
    color: "#FFF",
    fontSize: 24,
    fontWeight: 'bold',
  },
});