import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
// import { LineChart } from "react-native-chart-kit";

class Grafico extends Component {
  static navigationOptions = {
    title: "Gráfico",
    headerStyle: {
      backgroundColor: "#444A5A"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      justifyContent: "center"
    },
    headerRight: <Text style={{ color: "#FFF", marginRight: 10 }}>Sair</Text>
  };

  render() {
    // const data = {
    //   labels: ["January", "February", "March", "April", "May", "June"],
    //   datasets: [
    //     {
    //       data: [20, 45, 28, 80, 99, 43],
    //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    //     }
    //   ]
    // };
    return (
      <View style={styles.fundo}>
        <Text style={styles.titleGhart}>Geral</Text>
        {/* <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#444A5A",
    padding: 10 * 2
  },
  titleGhart: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFF"
  }
});
export default Grafico;