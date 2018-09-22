import React from "react";
import { StyleSheet, View, SectionList, Text } from "react-native";
import Transaction from "./Transaction";
import { getTransactions, getBalance } from "./api";
import { groupBy, map } from "lodash";
import isToday from "date-fns/is_today";
import isYesterday from "date-fns/is_yesterday";
import format from "date-fns/format";
import HistoryChart from "./HistoryChart";

const SectionHeader = ({ title }) => (
  <View
    style={{
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: "#f4f4f4",
      borderBottomWidth: 1,
      borderColor: "lightgrey"
    }}
  >
    <Text style={{ margin: 5, marginLeft: 10 }}>{title}</Text>;
  </View>
);

export default class App extends React.Component {
  state = {
    transactions: []
  };

  async componentDidMount() {
    this.showTransactions();
  }

  async showTransactions() {
    const balance = await getBalance();
    const transactions = await getTransactions();

    this.setState({ transactions, balance });
  }

  transactionDate = date => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";

    return format(date, "dddd DD MMMM");
  };

  render() {
    const byDate = groupBy(this.state.transactions, t =>
      this.transactionDate(t.created)
    );

    const sections = map(byDate, function(value, prop) {
      return { title: prop, data: value };
    });

    return (
      <View style={styles.container}>
        {this.state.transactions.length > 0 && (
          <View>
            <HistoryChart
              balance={this.state.balance.balance}
              spentToday={this.state.balance.spend_today}
              transactions={this.state.transactions}
            />
            {this.state.transactions.length > 0 && (
              <SectionList
                renderItem={({ item }) => <Transaction transaction={item} />}
                renderSectionHeader={({ section: { title } }) => (
                  <SectionHeader title={title} />
                )}
                sections={sections}
                keyExtractor={item => item.id}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    bottom: 0,
    right: 0
  }
});
