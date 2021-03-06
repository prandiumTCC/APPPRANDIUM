import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput
} from "react-native";
import firebase from "../../connection/firebaseConnnection";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class Principal extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Principal",
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
      nomePaciente: "",
      sobrenomePaciente: "",
      uid: "",
      isModalVisible: false,
      flatGrafico: [
        { key: "1", nome: "Bonieky", valor: 70 },
        { key: "2", nome: "asd", valor: 150 },
        { key: "3", nome: "Bonieky", valor: 70 },
        { key: "4", nome: "asd", valor: 150 },
        { key: "5", nome: "Bonieky", valor: 70 },
        { key: "6", nome: "asd", valor: 150 },
        { key: "7", nome: "Bonieky", valor: 70 },
        { key: "8", nome: "asd", valor: 150 }
      ],
      flatNutri: []
    };
    console.disableYellowBox = true;

    this.setState({ isModalVisible: !this.state.isModalVisible });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let state = this.state;
        state.uid = user.uid;
        this.setState(state);
        // alert(this.state.uid);
        firebase
          .database()
          .ref("PACIENTE")
          .child(this.state.uid)
          .once("value", snapshot => {
            let state = this.state;
            state.nomePaciente = snapshot.val().nome_paciente;
            state.sobrenomePaciente = snapshot.val().sobrenome_paciente;
            this.setState(state);
          });
      } else {
        firebase.auth().signOut();
      }
    });

    firebase
      .database()
      .ref("NUTRICIONISTA")
      .once("value", snapshot => {
        let state = this.state;
        state.flatNutri = [];

        snapshot.forEach(childItem => {
          state.flatNutri.push({
            key: childItem.key,
            nome: childItem.val().nome_nutri,
            sobrenome: childItem.val().sobrenome_nutri,
            crn: childItem.val().crn_nutri
          });
        });
        this.setState(state);
      });
  }

  flatGrafRender(item) {
    return (
      <View style={styles.cxGrafico}>
        <Text style={styles.cxGraficoTXT}>{item.valor}</Text>
        <Text style={styles.cxGraficoTxtSub}>{item.nome}</Text>
      </View>
    );
  }

  flatNutri(item) {
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
          <Text>CRN: {item.crn}</Text>
        </View>
        <TouchableHighlight
          style={styles.buttonSolicit}
          onPress={() => null}
        >
          <Ionicons name={"md-send"} color={"blue"} size={15} />
        </TouchableHighlight>
      </View>
    );
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={styles.fundo}>
        <View style={styles.dadosPessoais}>
          <View style={styles.cxFoto}>
            <Image
              style={styles.img}
              source={require("../../img/perfil.jpg")}
            />
          </View>
          <View style={styles.cxDados}>
            <Text>
              Nome: {this.state.nomePaciente} {this.state.sobrenomePaciente}
            </Text>
            <TouchableOpacity
              style={styles.btnPesquisar}
              onPress={this.toggleModal}
            >
              <Text>Pesquisar nutricionista</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cxResumoDesempenho}>
          <Text style={styles.titleResumoDesempenho}>Resumo desempenho</Text>
          <FlatList
            horizontal={true}
            //guarda as informacoes
            data={this.state.flatGrafico}
            //redenriza os itens
            renderItem={({ item }) => this.flatGrafRender(item)}
          />
        </View>
        <View style={styles.cxNutricionista}>
          <Text style={styles.titleNutricionista}>Seu Nutricionista</Text>
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

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalFundo}>
            <TouchableOpacity
              onPress={this.toggleModal}
              style={styles.btnModalClose}
            >
              <Text style={styles.elementClose}>X</Text>
            </TouchableOpacity>
            <FlatList
              style={styles.listnutriSeach}
              horizontal={false}
              data={this.state.flatNutri}
              renderItem={({ item }) => this.flatNutri(item)}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#444A5A"
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
  buttonSolicit: {
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
