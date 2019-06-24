import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Text
} from "react-native";
import firebase from "../../connection/firebaseConnnection";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getValues } from "jest-validate/build/condition";

class PlanoAlimentarNutri extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Cadastro plano alimentar",
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
      valor: 0,
      valores: [
        { nome: 'manhã', valor: 'manhã' },
        { nome: 'Tarde', valor: 'Tarde' },
        { nome: 'Noite', valor: 'Noite' },
      ],
      alimentoV: 0,
      alimentos: []
    };
    // firebase.database().ref("ALIMENTO").once('value', (snap) => {
    //   let state = this.state;

    //   state.alimentos = [];
    //   snap.forEach(element => {
    //     if (element.val().sts_alimento == 1
    //     ) {
    //       state.alimentos.push(
    //         { key: element.val() }
    //       )
    //       this.setState(state);

    //     } else {
    //       // var usersRef = firebase.database().ref("ALIMENTO");
    //       // var alimentoRef = usersRef.child().key;
    //       // var path = alimentoRef.toString();
    //       // alert(path)

    //     }
    //   });

    // });
    // alert(getValues(firebase.database().ref("ALIMENTO").))
  }

  render() {
    let servicosItens = this.state.valores.map((v, k) => {
      return <Picker.Item key={k} value={k} label={v.nome} />
    });
    // let AlimentoItens = this.state.alimentos.map((v, k) => {
    //   return <Picker.Item key={k} value={k} label={v.nome} />
    // });
    return (
      <View style={styles.container}>
        <Picker itemStyle={styles.pickerBackGround} selectedValue={this.state.valor} onValueChange={(itemValue, itemIndex) => this.setState({ valor: itemValue })}>
          {servicosItens}
        </Picker>
        <Text>{this.state.valores[this.state.valor].valor}</Text>

        {/* <Picker itemStyle={styles.pickerBackGround} selectedValue={this.state.alimentoV} onValueChange={(itemValue, itemIndex) => this.setState({ valor: itemValue })}>
          {AlimentoItens}
        </Picker>
        <Text>{this.state.alimentos[this.state.alimentoV].valor}</Text> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444A5A",
    padding: 10,
    justifyContent: "center"

  },
  pickerBackGround: {
    backgroundColor: "#FFF"
  }

});
export default PlanoAlimentarNutri;
