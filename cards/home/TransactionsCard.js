import React from "react";
import { View } from "react-native";
import { getTransactions, getBalance } from "../../api";
import { groupBy, map } from "lodash";
import isToday from "date-fns/is_today";
import isYesterday from "date-fns/is_yesterday";
import format from "date-fns/format";
import HistoryChart from "./HistoryChart";
import Transactions from "./Transactions";

const transactionDate = date => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return format(date, "dddd DD MMMM");
};

class TransactionsCard extends React.Component {
  state = {
    transactions: [],
    selectedDate: null
  };

  constructor(props) {
    super(props);
    this.onSelectedDateChanged = this.onSelectedDateChanged.bind(this);
  }

  async componentDidMount() {
    this.showTransactions();
  }

  async showTransactions() {
    const balance = await getBalance();
    const transactions = await getTransactions();

    this.setState({ transactions, balance });
  }

  onSelectedDateChanged(selectedDate) {
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
    if (!this.state.transactions) return null;
    if (!this.state.balance) return null;

    const byDate = groupBy(this.state.transactions, t =>
      format(t.created, "YYYY-MM-DD")
    );

    const sections = map(byDate, function(value, prop) {
      return { title: transactionDate(prop), data: value, rawDate: prop };
    });

    return (
      <View style={{ backgroundColor: "white" }}>
        <HistoryChart
          balance={this.state.balance.balance}
          spentToday={this.state.balance.spend_today}
          transactions={sections}
          selectedDate={this.state.selectedDate}
        />

        <Transactions
          sections={sections}
          onSelectedDateChanged={this.onSelectedDateChanged}
        />
      </View>
    );
  }
}

export default TransactionsCard;
