import React from "react";
import { SectionList } from "react-native";
import PropTypes from "prop-types";
import Transaction from "./Transaction";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-native";

class Transactions extends React.Component {
  onViewableItemsChanged = items => {
    const selectedDate = items.viewableItems[0].item.rawDate;
    this.props.onSelectedDateChanged(selectedDate);
  };

  render() {
    return (
      <SectionList
        onViewableItemsChanged={this.onViewableItemsChanged}
        renderItem={({ item }) => (
          <Link to={{ pathname: "/transaction", state: { transaction: item } }}>
            <Transaction transaction={item} />
          </Link>
        )}
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
