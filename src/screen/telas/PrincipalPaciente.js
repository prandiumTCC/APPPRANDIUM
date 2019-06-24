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
    title: "Pacientes",
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
      uid: "",
      flatNutri: []
    };
    console.disableYellowBox = true;
    this.enviarNutri = this.enviarNutri.bind(this);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let state = this.state;
        state.uid = user.uid;
        this.setState(state);
        // alert(this.state.uid);

      } else {
        firebase.auth().signOut();
      }
    });

    firebase
      .database()
      .ref("PACIENTE")
      .once("value", snapshot => {
        let state = this.state;
        state.flatNutri = [];

        snapshot.forEach(childItem => {
          state.flatNutri.push({
            key: childItem.key,
            id: childItem.val().useruid,
            nome: childItem.val().nome_paciente,
            sobrenomme: childItem.val().sobrenome_paciente,
          });
        });
        this.setState(state);
      });

    this.desativar = this.desativar.bind(this);
  }

  enviarNutri = () => {
    alert("enviando dados");
  };


  flatPac(item) {
    return (
      <View style={styles.dadosPessoaisN}>
        <Image
          style={styles.flatfoto}
          source={require("../../img/perfil.jpg")}
        />
        <View style={styles.flatTxt}>
          <Text>
            {item.nome} {item.sobrenome}
          </Text>
        </View>
      </View>
    );
  }

  desativar = (id) => {
    //TEM QUE DESATIVAR ESSA PORRA!
  }

  boxPac = (item) => {
    return (
      <View style={styles.cxNutricionista}>
        <View style={styles.boxNutri}>
          <View style={styles.fotoNutri}>
            <Image
              style={styles.img}
              source={require("../../img/perfil.jpg")}
            />
          </View>
          <View style={styles.dadosNutri}>
            <Text style={styles.infoNutri}>{item.nome} {item.sobrenomme}</Text>
          </View>
          <View style={styles.buttonDisable}>
            <TouchableOpacity
              onPress={() => this.desativar(item.id)}
            >
              <Ionicons name={"md-trash"} color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.fundo}>
        <FlatList
          style={styles.flat}
          data={this.state.flatNutri}
          renderItem={({ item }) => this.boxPac(item)}
        />
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
  dadosPessoais: {
    height: 100,
    backgroundColor: "#FFF",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 5
  },
  dadosPessoaisN: {
    height: 50,
    backgroundColor: "#FFF",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    margin: 5
  },
  cxDados: {
    flex: 1
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 400 / 2
  },
  cxDados: {
    flex: 2,
    marginLeft: 5,
    fontWeight: "bold"
  },
  btnPesquisar: {
    backgroundColor: "#ffee58",
    borderRadius: 3,
    height: 44,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  cxResumoDesempenho: {
    flex: 4,
    padding: 10
  },
  titleResumoDesempenho: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 3
  },
  cxGrafico: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: 100,
    height: 90,
    margin: 4
  },
  cxGraficoTXT: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  cxGraficoTxtSub: {
    justifyContent: "center",
    alignItems: "center",
    color: "#CCC",
    fontSize: 10
  },
  titleNu: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFF"
  },
  cxNutricionista: {
    flex: 7,
    padding: 10
  },
  titleNutricionista: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 3
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
  modalFundo: {
    backgroundColor: "#FFF",
    borderRadius: 3,
    padding: 10
  },
  btnModalClose: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "transparent"
  },
  elementClose: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18
  },
  titleModal: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  txtModal: {
    fontWeight: "bold"
  },
  btnSend: {
    backgroundColor: "#839DCA",
    borderRadius: 3,
    height: 44,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  txtBtn: {
    color: "#FFF"
  },
  form: {
    marginTop: 10 * 2
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 44,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 20
  },
  listnutriSeach: {
    padding: 10,
    height: 150
  },
  flatfoto: {
    width: 30,
    height: 30,
    borderRadius: 400 / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  flatTxt: {
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "center",
    flex: 2
  },
  buttonDisable: {
    height: 40,
    width: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
