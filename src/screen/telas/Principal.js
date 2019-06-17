import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Principal extends Component {

  static navigationOptions = {
    title:'Principal',
    headerStyle: {
      backgroundColor: '#444A5A',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent:'center'
    },
    headerRight:(
      <Icon name="home" size={15} color="#000"/>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      flatGrafico: [
        { key: "1", nome: 'Bonieky', valor: '70%' },
        { key: "2", nome: 'asd', valor: '150%' },
        { key: "3", nome: 'Bonieky', valor: '70%' },
        { key: "4", nome: 'asd', valor: '150%' },
        { key: "5", nome: 'Bonieky', valor: '70%' },
        { key: "6", nome: 'asd', valor: '150%' },
        { key: "7", nome: 'Bonieky', valor: '70%' },
        { key: "8", nome: 'asd', valor: '150%' },
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
          <Text style={styles.titleNutricionista} >Seu Nutricionista</Text>
          <View style={styles.boxNutri}>
            <View style={styles.fotoNutri}>
              <Image style={styles.img}
                source={require('../../img/perfilNutri.jpg')}
              />
            </View>
            <View style={styles.dadosNutri}>
              <Text style={styles.infoNutri}>Nome: Thompson S.</Text>
              <Text style={styles.infoNutri}>CRN: DF-0000x</Text>
            </View>
          </View>
        </View>
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
  cxResumoDesempenho:{
    flex: 3,
    padding: 10
  },
  titleResumoDesempenho: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 3
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
  titleNu:{
    fontWeight: 'bold',
    fontSize: 18,
    color:'#FFF'
  },
  cxNutricionista: {
    flex: 7,
    padding: 10
  },
  titleNutricionista: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 3
  },
  boxNutri: {
    backgroundColor: '#FFF',
    height: 100,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10
  },
  fotoNutri:{
    width: 80,
    height: 80,
    borderRadius: 40,
    flex: 1
  },
  dadosNutri: {
    justifyContent: 'center',
    flex: 2
  },
  infoNutri:{
    fontWeight: 'bold'
  }
});
export default Principal;