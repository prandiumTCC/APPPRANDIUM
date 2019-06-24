import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import firebase from "../connection/firebaseConnnection";
import NetInfo from "@react-native-community/netinfo";
import { StackActions, NavigationActions } from "react-navigation";
export default class Preload extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      netstatus: false
    };

    //firebase.auth().signOut();
    // NetInfo.addEventListener(status => {
    //   let state = this.state;
    //   state.netstatus = status.isConnected;
    //   this.setState(state);
    //   alert(this.state.netstatus);
    // });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //Nutri ou Paci
        firebase.database().ref('PACIENTE').child(user.uid).once('value')
          .then((snap) => {
            if (snap.val().perfil == 2 && snap.val().sts_paciente == 0) {
              //alert("1" + user.uid);
              this.props.navigation.navigate('Bottomtab');
            } else {
              firebase.auth().signOut();
              alert("Suas credênciais foram revogadas, entre em contato com ADM");
              this.props.navigation.navigate('Login');
            }
          });

        firebase.database().ref('NUTRICIONISTA').child(user.uid).once('value')
          .then((snap) => {
            if (snap.val().perfil == 3 && snap.val().sts_nutri == 0) {

              this.props.navigation.navigate('BottomtabNutri');
            } else {
              firebase.auth().signOut();
              alert("Suas credênciais foram revogadas, entre em contato com ADM");
              this.props.navigation.navigate('Login');
            }
          });

        firebase.database().ref('ADM').child(user.uid).once('value')
          .then((snap) => {
            if (snap.val().perfil == 1) {
              //alert("Entrou porra   " + user.uid);
              this.props.navigation.navigate('BottomtabADM');
            } else {
              firebase.auth().signOut();
              this.props.navigation.navigate('Login');
            }
          });


        /*
          else if (snap.val().perfil == 1) {
            this.props.navigation.navigate('./telas/PrincipalADM');
          } else {
            //this.props.navigation.navigate('./telas/PrincipalNutri');
          }
        */
      } else {
        // const resetAction = StackActions.reset({
        //   index: 0,
        //   actions: [NavigationActions.navigate({ routeName: "Login" })]
        // });
        // this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate("Login");
      }
    });
  }

  render() {
    return (
      <View style={styles.splash}>
        <Text style={styles.title}>PRANDIUM</Text>
        <Text style={styles.titlePsw}>Planejamento nutricional</Text>
        <Text>{this.state.netstatus}</Text>
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
