import React from "react";
import { Image, Text, View } from "react-native";
import Amount from "./Amount";

const Transaction = ({ transaction }) => (
  <View
    style={{
      borderBottomWidth: 1,
      borderColor: "lightgrey",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 10
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Image
        style={{ width: 30, height: 30, borderRadius: 5 }}
        source={{ uri: transaction.merchant.logo }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text>{transaction.merchant.name}</Text>
        {transaction.notes && (
          <Text style={{ fontSize: 11, color: "grey" }}>
            {transaction.notes}
          </Text>
        )}
      </View>
    </View>
    <Amount amount={transaction.amount} />
  </View>
);

export default Transaction;
