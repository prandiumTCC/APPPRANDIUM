import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firebase from "../../connection/firebaseConnnection";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      nomeNutri: "",
      sobrenomeNutri: "",
      crn: '',
      uid: "",
      isModalVisible: false,
      flatGrafico: [],
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
          .ref("NUTRICIONISTA")
          .child(this.state.uid)
          .on("value", snapshot => {
            let state = this.state;
            state.nomeNutri = snapshot.val().nome_nutri;
            state.sobrenomeNutri = snapshot.val().sobrenome_nutri;
            state.crn = snapshot.val().crn_nutri;
            this.setState(state);
          });

        firebase
          .database()
          .ref("NUTRICIONISTA")
          .child(this.state.uid)
          .child("DATANUTRI")
          .on("value", snapshot => {
            let state = this.state;
            state.flatGrafico = []
            state.flatGrafico.push(
              { key: "1", nome: "Consulta", valor: snapshot.val().consulta_nutri },
              { key: "2", nome: "Conversa", valor: snapshot.val().conversas },
              { key: "3", nome: "Pendência", valor: snapshot.val().pendencia },
              { key: "4", nome: "Solicitações", valor: snapshot.val().solicitacoes },
            );
            this.setState(state);
          });

      } else {
        firebase.auth().signOut();
      }
    });
  }

  flatGrafRender(item) {
    return (
      <View style={styles.cxGrafico}>
        {/* {alert(item.key)} */}
        <Text style={styles.cxGraficoTXT}>{item.valor}</Text>
        <Text style={styles.cxGraficoTxtSub}>{item.nome}</Text>
      </View>
    );
  }
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
              {this.state.nomeNutri} {this.state.sobrenomeNutri}
            </Text>
            <Text>
              Crn: {this.state.crn}
            </Text>

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
          <Text style={styles.titleNutricionista}>Seus Pacientes</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 400 / 2
  },
  btnPesquisar: {
    backgroundColor: "#ffee58",
    borderRadius: 3,
    height: 44,
    marginTop: 10,
    justifyContent: "flex-start",
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
