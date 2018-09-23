import React from "react";
import { SectionList } from "react-native";
import PropTypes from "prop-types";
import isToday from "date-fns/is_today";
import isYesterday from "date-fns/is_yesterday";
import format from "date-fns/format";
import Transaction from "./Transaction";
import SectionHeader from "./SectionHeader";

class Transactions extends React.Component {
  transactionDate = date => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";

    return format(date, "dddd DD MMMM");
  };

  onViewableItemsChanged = items => {
    const selectedDate = items.viewableItems[0].item.rawDate;
    this.props.onSelectedDateChanged(selectedDate);
  };

  render() {
    return (
      <SectionList
        onViewableItemsChanged={this.onViewableItemsChanged}
        renderItem={({ item }) => <Transaction transaction={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        sections={this.props.sections}
        keyExtractor={item => item.id}
      />
    );
  }
}

Transactions.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelectedDateChanged: PropTypes.func.isRequired
};

export default Transactions;
