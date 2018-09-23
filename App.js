import React from "react";
import { StyleSheet, StatusBar, View, SectionList, Text } from "react-native";
import Transaction from "./Transaction";
import { getTransactions, getBalance } from "./api";
import { groupBy, map } from "lodash";
import isToday from "date-fns/is_today";
import isYesterday from "date-fns/is_yesterday";
import format from "date-fns/format";
import HistoryChart from "./HistoryChart";

class SectionHeader extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: "#f4f4f4",
          borderBottomWidth: 1,
          borderColor: "lightgrey"
        }}
      >
        <Text style={{ margin: 5, marginLeft: 10 }}>{this.props.title}</Text>;
      </View>
    );
  }
}

const transactionDate = date => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return format(date, "dddd DD MMMM");
};

export default class App extends React.Component {
  state = {
    transactions: [],
    selectedDate: null
  };

  constructor(props) {
    super(props);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
  }

  async componentDidMount() {
    this.showTransactions();
  }

  async showTransactions() {
    const balance = await getBalance();
    const transactions = await getTransactions();

    this.setState({ transactions, balance });
  }

  onViewableItemsChanged(result) {
    const selectedDate = result.viewableItems[0].item.rawDate;
    if (selectedDate) {
      this.setState(prevState => {
        if (prevState.selectedDate === selectedDate) {
          return null;
        } else {
          return { selectedDate: selectedDate };
        }
      });
    }
  }

  render() {
    const byDate = groupBy(this.state.transactions, t =>
      format(t.created, "YYYY-MM-DD")
    );

    const sections = map(byDate, function(value, prop) {
      return { title: transactionDate(prop), data: value, rawDate: prop };
    });

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {this.state.transactions.length > 0 && (
          <View>
            <HistoryChart
              balance={this.state.balance.balance}
              spentToday={this.state.balance.spend_today}
              transactions={sections}
              selectedDate={this.state.selectedDate}
            />
            {this.state.transactions.length > 0 && (
              <SectionList
                onViewableItemsChanged={this.onViewableItemsChanged}
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
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
