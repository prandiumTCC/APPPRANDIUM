import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "../connection/firebaseConnnection";

export default class MensagemItem extends Component {
  constructor(props) {
    super(props);

    let bgColor = "#EEE";
    let align = "flex-start";
    let txtAlign = "left";

    alert(this.props.me);

    if (this.props.data.uid == this.props.me) {
      bgColor = "#9999FF";
      align = "flex-end";
    }

    this.state = {
      bgColor: bgColor,
      align: align,
      textAlign: txtAlign
    };
  }
  render() {
    return (
      <View
        style={[
          MensagemItemStyles.area,
          { alignSelf: this.state.align, backgroundColor: this.state.bgColor }
        ]}
      >
        <Text style={{ textAlign: this.state.textAlign }}>
          {this.props.data.m}
        </Text>
        <Text style={MensagemItemStyles.dataTxt}>{this.props.data.date}</Text>
      </View>
    );
  }
}

const MensagemItemStyles = StyleSheet.create({
  area: {
    margin: 10,
    backgroundColor: "#999",
    padding: 10,
    borderRadius: 5,
    maxWidth: "80%"
  },
  dataTxt: {
    fontSize: 11,
    textAlign: "right"
  }
});
