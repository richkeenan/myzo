import React from "react";
import { View, Text } from "react-native";
import TransactionDetails from "./TransactionDetails";

const TransactionDetailsCard = ({ location }) => {
  const state = location.state;
  if (!state) return null;
  const transaction = state.transaction;

  return <TransactionDetails transaction={transaction} />;
};

export default TransactionDetailsCard;
