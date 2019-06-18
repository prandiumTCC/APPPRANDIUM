import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Conversa extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Tela de conversa</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});