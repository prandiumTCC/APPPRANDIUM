import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";

class Principal extends Component {

  static navigationOptions = {
    title: 'Principal',
    headerStyle: {
      backgroundColor: '#444A5A',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent: 'center'
    },
    headerRight: (
      <Icon name="home" size={15} color="#fff" />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      flatGrafico: [
        { key: "1", nome: 'Bonieky', valor: 70 },
        { key: "2", nome: 'asd', valor: 150 },
        { key: "3", nome: 'Bonieky', valor: 70 },
        { key: "4", nome: 'asd', valor: 150 },
        { key: "5", nome: 'Bonieky', valor: 70 },
        { key: "6", nome: 'asd', valor: 150 },
        { key: "7", nome: 'Bonieky', valor: 70 },
        { key: "8", nome: 'asd', valor: 150 },
      ],
      flatNutri:[
        {key:'1', nome: 'Dr.Fabricio'},
        {key:'2', nome: 'Dr.Fabio'}
      ]
    };
    this.enviarNutri = this.enviarNutri.bind(this);
  }
  enviarNutri() {
    alert('enviando dados');
  }
  flatGrafRender(item) {
    return (
      <View style={styles.cxGrafico}>
        <Text style={styles.cxGraficoTXT}>{item.valor}</Text>
        <Text style={styles.cxGraficoTxtSub}>{item.nome}</Text>
      </View>
    );
  }
  flatNutri(itemN) {
    return (
      <View style={styles.dadosPessoais}>
        <Image style={styles.img}
          source={require('../../img/perfil.jpg')}
        />
        <Text style={styles.cxGraficoTxtSub}>{itemN.nome}</Text>
      </View>
    );
  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  render() {
    return (
      <View style={styles.fundo}>
        <View style={styles.dadosPessoais}>
          <View style={styles.cxFoto}>
            <Image style={styles.img}
              source={require('../../img/perfil.jpg')}
            />
          </View>
          <View style={styles.cxDados}>
            <Text>Nome</Text>
            <TouchableOpacity style={styles.btnPesquisar} onPress={this.toggleModal}>
              <Text>Pesquisar nutricionista</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList style={styles.flastListGrafico}
          horizontal={true}
          //guarda as informacoes
          data={this.state.flatGrafico}
          //redenriza os itens
          renderItem={({ item }) => this.flatGrafRender(item)}
        />
        <View>
          <Text style={styles.titleNu} >Seu nutricionista</Text>
        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalFundo}>
            <TouchableOpacity onPress={this.toggleModal} style={styles.btnModalClose} >
              <Text style={styles.elementClose}>X</Text>
            </TouchableOpacity>
            <View style={styles.titleModal}>
              <Text style={styles.txtModal}>{'pesquiar nutricionista'.toUpperCase()}</Text>
            </View>
            <View tyle={styles.form}>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                autoCorrect={false}
                placeholder="Nome do nutricionista"
                underlineColorAndroid="transparent"
              />
            </View>
            <FlatList
              data={this.state.flatNutri}
              renderItem={({itemN})=> this.flatNutri(itemN)}
            />

            <TouchableOpacity style={styles.btnSend} onPress={this.enviarNutri}>
              <Text style={styles.txtBtn}>{'Enviar solicitacao'.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </View>
    )
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
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 5
  },
  cxDados: {
    flex: 1
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 400 / 2,
  },
  cxDados: {
    flex: 2,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  btnPesquisar: {
    backgroundColor: "#ffee58",
    borderRadius: 3,
    height: 44,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cxGrafico: {
    backgroundColor: "#FFF",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 100,
    height: 90,
    margin: 4
  },
  cxGraficoTXT: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  cxGraficoTxtSub: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#CCC',
    fontSize: 10
  },
  flastListGrafico: {
    padding: 10,
    height: 50,
  },
  titleNu: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF'
  },
  modalFundo: {
    backgroundColor: '#FFF',
    borderRadius: 3,
    padding: 10
  },
  btnModalClose: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: "transparent",
  },
  elementClose: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18
  },
  titleModal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  txtModal: {
    fontWeight: 'bold',
  },
  btnSend: {
    backgroundColor: "#839DCA",
    borderRadius: 3,
    height: 44,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {
    color: "#FFF"
  },
  form: {
    marginTop: 10 * 2,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 44,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 20
  },

  cxNutri:{

  }

});
export default Principal;