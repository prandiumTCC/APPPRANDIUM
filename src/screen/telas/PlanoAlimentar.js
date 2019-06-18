import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

class PlanoAlimentar extends Component {
  
  static navigationOptions = {
    title: "Plano Alimentar",
    headerStyle: {
      backgroundColor: '#444A5A',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent:'center'
    },
    headerRight:(
      <Text style={{color:'#FFF', marginRight:10}}>Sair</Text>
    )
  };

  render(){
    return(
      <ScrollView style={styles.container}>
        <Text style={styles.titleContainer}>SEU PLANO ALIMENTAR</Text>
        <View style={styles.boxPlanoAlimentar}>
          <Text style={styles.titleTurno}>MANHÃ</Text>
          <View style={styles.boxAlimentos}>
            <View style={styles.subTitleAlimentos}>
              <Text style={styles.txtSubTitle}>Alimentos</Text>
              <Text style={styles.txtSubTitle}>Calorias</Text>
            </View>
            <View style={styles.itemAlimentos}>
              <Text style={styles.txtItemAlimento}>HAMBURGUER</Text>
              <Text style={styles.txtItemAlimento}>115</Text>
            </View>
            <View style={styles.itemAlimentos}>
              <Text style={styles.txtItemAlimento}>TORRADA</Text>
              <Text style={styles.txtItemAlimento}>75</Text>
            </View>
          </View>
          <Text style={styles.titleTurno}>LANCHE</Text>
          <View style={styles.boxAlimentos}>
            <View style={styles.subTitleAlimentos}>
              <Text style={styles.txtSubTitle}>Alimentos</Text>
              <Text style={styles.txtSubTitle}>Calorias</Text>
            </View>
            <View style={styles.itemAlimentos}>
              <Text style={styles.txtItemAlimento}>PÃO INTEGRAL</Text>
              <Text style={styles.txtItemAlimento}>15</Text>
            </View>
          </View>
          <Text style={styles.titleTurno}>ALMOÇO</Text>
          <View style={styles.boxAlimentos}>
            <View style={styles.subTitleAlimentos}>
              <Text style={styles.txtSubTitle}>Alimentos</Text>
              <Text style={styles.txtSubTitle}>Calorias</Text>
            </View>
            <View style={styles.itemAlimentos}>
              <Text style={styles.txtItemAlimento}>PIZZA</Text>
              <Text style={styles.txtItemAlimento}>57</Text>
            </View>
            <View style={styles.itemAlimentos}>
              <Text style={styles.txtItemAlimento}>FEIJOADA</Text>
              <Text style={styles.txtItemAlimento}>557</Text>
            </View>
            <View style={styles.itemAlimentos}>
              <Text style={styles.txtItemAlimento}>MAÇA</Text>
              <Text style={styles.txtItemAlimento}>7</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444A5A',
    padding: 10
  },
  titleContainer:{
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  boxPlanoAlimentar:{
    backgroundColor: '#CCC',
    borderRadius: 5,
    padding: 20
  },
  titleTurno:{
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  boxAlimentos:{
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  subTitleAlimentos: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txtSubTitle: {
    fontWeight: 'bold',
    fontSize: 15
  },
  itemAlimentos:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    marginBottom: 5
  },
  txtItemAlimento:{
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15
  }
});
export default PlanoAlimentar;