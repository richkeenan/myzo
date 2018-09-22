import React from "react";
import { Text, View } from "react-native";

const Amount = ({ amount }) => {
  const amountString =
    amount < 0 ? (amount * -1).toString() : amount.toString();
  const pounds = amountString.slice(0, amountString.length - 2);
  const pence = amountString.slice(amountString.length - 2);

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      <Text style={{ fontWeight: "200", fontSize: 30, marginBottom: -4 }}>
        {pounds}
      </Text>
      <Text>.</Text>
      <Text style={{ fontWeight: "200", fontSize: 18 }}>{pence}</Text>
    </View>
  );
};

export default Amount;
