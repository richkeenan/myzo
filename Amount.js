import React from "react";
import { Text, View } from "react-native";

const Amount = ({ amount }) => {
  const amountString =
    amount < 0 ? (amount * -1).toString() : amount.toString();
  const pounds = amountString.slice(0, amountString.length - 2);
  const pence = amountString.slice(amountString.length - 2);
  const color = amount > 0 ? "#12a829" : "black";

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      {amount > 0 && <Text style={{ color }}>+</Text>}
      <Text
        style={{ color, fontWeight: "200", fontSize: 30, marginBottom: -4 }}
      >
        {pounds}
      </Text>
      <Text style={{ color }}>.</Text>
      <Text style={{ color, fontWeight: "200", fontSize: 18 }}>{pence}</Text>
    </View>
  );
};

export default Amount;
