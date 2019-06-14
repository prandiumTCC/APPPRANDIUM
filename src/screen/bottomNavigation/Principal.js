import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Principal extends Component {

  static navigationOptions = {
    title: "Cadastro Paciente",
    headerStyle: {
      backgroundColor: '#444A5A',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      flatGrafico: [
        { key: "1", nome: 'Bonieky', valor: 70 },
        { key: "2", nome: 'asd', valor: 150 },
        { key: "3", nome: 'Bonieky', valor: 70 },
        { key: "4", nome: 'asd', valor: 150 },
        { key: "5", nome: 'Bonieky', valor: 70 },
        { key: "6", nome: 'asd', valor: 150 },
        { key: "7", nome: 'Bonieky', valor: 70 },
        { key: "8", nome: 'asd', valor: 150 },
      ]
    }
  }

  flatGrafRender(item) {
    return (
      <View style={styles.cxGrafico}>
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
            <Image style={styles.img}
              source={require('../../img/perfil.jpg')}
            />
          </View>
          <View style={styles.cxDados}>
            <Text>Nome</Text>
            <TouchableOpacity style={styles.btnPesquisar}>
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
    flex: 1,
    backgroundColor: "#FFF",
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    width: 90,
    height:90,
    margin: 4
  },
  cxGraficoTXT: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  cxGraficoTxtSub: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#CCC'
  },
  flastListGrafico: {
    padding: 10
  }
});
export default Principal;