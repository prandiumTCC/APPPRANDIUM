import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import firebase from "../../connection/firebaseConnnection";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class PrincipalPaciente extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Cadastro Alimento",
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
      nomeAlimento: '',
      caloriasAlimento: '',
      /*lista: [{
        nameAliment: 'Teste',
        calAliment: 1220
      }]*/
      lista: []
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let state = this.state;
        state.uid = user.uid;
        this.setState(state);
        // alert(this.state.uid)


        firebase.database().ref('ALIMENTO').on('value', (snap) => {
          let state = this.state;
          state.lista = [];
          snap.forEach((childItem) => {
            if (childItem.val().sts_alimento == 0) {
              state.lista.push({
                key: childItem.key,
                nameAliment: childItem.val().nome_alimento,
                calAliment: childItem.val().coloria_alimento
              });
            }
          });
          this.setState(state);
        });

        /*firebase.database().ref('ALIMENTO').once('value', snap => {
          state.lista = [];
          state.lista.push({
            nameAliment: snap.val().nome_alimento,
            calAliment: snap.val().coloria_alimento
          });

          this.setState(state);
        });*/


      } else {
        firebase.auth().signOut();
      }
    });

    this.cadastrar = this.cadastrar.bind(this);
    this.desativar = this.desativar.bind(this);
  }

  cadastrar = () => {
    if (this.state.nomeAlimento != '' && this.state.caloriasAlimento != '') {
      firebase.database().ref('ALIMENTO').push().set({
        nome_alimento: this.state.nomeAlimento,
        coloria_alimento: this.state.caloriasAlimento,
        sts_alimento: 0
      });
      let state = this.state;
      state.nomeAlimento = '';
      state.caloriasAlimento = '';
      this.setState(state);
      alert("Alimento cadastrado com sucesso!");
    } else {
      alert('Preencha os campos');
    }
  }

  desativar = (item) => {
    firebase.database().ref('ALIMENTO').child(item.key).update({
      sts_alimento: 1
    });

    alert('Produto deletado!');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cadastrar}>
          <Text style={styles.titleForm}>Nome alimento</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nome do alimento"
              value={this.state.nomeAlimento}
              underlineColorAndroid="transparent"
              onChangeText={nomeAlimento => this.setState({ nomeAlimento })}
            />
          </View>
          <Text style={styles.titleForm}>Calorias alimento</Text>
          <View tyle={styles.form}>
            <TextInput
              keyboardType={"numeric"}
              style={styles.input}
              autoCorrect={false}
              value={this.state.caloriasAlimento}
              placeholder="Calorias do alimento"
              underlineColorAndroid="transparent"
              onChangeText={caloriasAlimento => this.setState({ caloriasAlimento })}
            />
          </View>
          <TouchableOpacity style={styles.btnLogar} onPress={this.cadastrar}>
            <Text style={styles.txtBtn}>{"Cadastrar".toLocaleUpperCase()}</Text>
          </TouchableOpacity>
          <Text style={styles.titleForm}>Listas de alimentos</Text>
          <FlatList
            style={styles.flat}
            data={this.state.lista}
            renderItem={({ item }) => this.listaAli(item)}
          />
        </View>
      </View>
    );
  }

  listaAli(item) {
    return (
      <View>
        <View style={styles.boxAlimentos}>
          <View style={styles.subTitleAlimentos}>
            <Text style={styles.txtSubTitle}>Nome</Text>
            <Text style={styles.txtSubTitle}>Porção</Text>
            <Text style={styles.txtSubTitle}>Remover</Text>
          </View>
          <View style={styles.itemAlimentos}>
            <Text style={styles.txtItemAlimento}>{item.nameAliment}</Text>
            <Text style={styles.txtItemAlimento}>{item.calAliment}</Text>
            <View style={styles.buttonDisable}>
              <TouchableOpacity
                onPress={() => this.desativar(item.id)}
              >
                <Ionicons name={"md-trash"} color="white" size={20} />
              </TouchableOpacity>
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
    backgroundColor: '#444A5A'
  },
  cadastrar: {
    padding: 15,
    flex: 1
  },
  titleForm: {
    color: "#FFF",
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "bold"
  },
  form: {
    marginTop: 10 * 2
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 20
  },
  title: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold"
  },
  btnLogar: {
    backgroundColor: "#9DCA83",
    borderRadius: 3,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    marginTop: 15
  },
  flat: {
    backgroundColor: '#CCC',
    padding: 5,
    marginTop: 10
  },
  titleContainer: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10
  },
  boxPlanoAlimentar: {
    backgroundColor: "#CCC",
    borderRadius: 5,
    padding: 20
  },
  titleTurno: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  boxAlimentos: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5
  },
  subTitleAlimentos: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  txtSubTitle: {
    fontWeight: "bold",
    fontSize: 15
  },
  itemAlimentos: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  txtItemAlimento: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15
  },
  buttonDisable: {
    height: 40,
    width: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
