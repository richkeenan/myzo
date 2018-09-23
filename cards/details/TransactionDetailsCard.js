import React from "react";
import PropTypes from "prop-types";
import TransactionDetails from "./TransactionDetails";

const TransactionDetailsCard = ({ location }) => {
  const state = location.state;
  if (!state) return null;
  const transaction = state.transaction;

  return <TransactionDetails transaction={transaction} />;
};

TransactionDetailsCard.propTypes = {
  location: PropTypes.object
};

export default TransactionDetailsCard;
