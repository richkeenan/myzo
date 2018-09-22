import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Transaction from "./Transaction";
import { getTransactions } from "./api";

export default class App extends React.Component {
  state = {
    transactions: []
  };

  async componentDidMount() {
    this.showTransactions();
  }

  async showTransactions() {
    const json = await getTransactions();
    const transactions = json.transactions.map(t => ({ key: t.id, ...t }));

    this.setState({ transactions });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.transactions.length > 0 && (
          <FlatList
            data={this.state.transactions}
            renderItem={({ item }) => <Transaction transaction={item} />}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
