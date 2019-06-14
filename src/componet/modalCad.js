import React, { Component } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity,Button } from 'react-native';
export default class ModalCad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false
    };

    this.CadNutri = this.CadNutri.bind(this);
    this.CadPaciente = this.CadPaciente.bind(this);
  }

  CadNutri(){
    this.props.navigation.navigate("../screen/CadastroMedico");
  }
  CadPaciente(){
    this.props.navigation.navigate("../screen/CadastroPaciente");
  }

  render() {
    return (
      <View styles={styles.body}>
        <Modal animationType="slide" visible={this.state.modalVisible}>
          <View style={styles.modal}>
            <Text>Tipo de Cadastro</Text>
            <TouchableOpacity style={styles.btnCadNutri} onPress={this.CadNutri}>
              <Text>CADASTRO NUTICIONISTA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCadPaciente} onPress={this.CadPaciente}>
              <Text>CADASTRO PACIENTE</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

}
const styles =StyleSheet.create({
  body:{
    justifyContent:'center',
    alignItems:'center',
    padding:20
  },
  modal:{
    justifyContent:'center',
    alignItems:'center',
    padding:20
  },
  btnCadNutri:{
    backgroundColor: "#303F9F",
    borderRadius:3,
    height:44,
    justifyContent:'center',
    alignItems:'center',
    color:"#FFF",
  },
  btnCadPaciente:{
    backgroundColor: "#1B5E20",
    borderRadius:3,
    height:44,
    justifyContent:'center',
    alignItems:'center',
    color:"#FFF",
  },
});