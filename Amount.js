import React from "react";
import { Text, View } from "react-native";

const Amount = ({ amount, fontWeight = "200", showCurrency, color }) => {
  const amountString =
    amount < 0 ? (amount * -1).toString() : amount.toString();
  const pounds = amountString.slice(0, amountString.length - 2);
  const pence = amountString.slice(amountString.length - 2);
  const fontColor = color || (amount > 0 ? "#12a829" : "black");

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      {amount > 0 && <Text style={{ color: fontColor }}>+</Text>}
      {showCurrency && (
        <Text style={{ color: fontColor, fontWeight, fontSize: 18 }}>£</Text>
      )}

      <Text
        style={{
          color: fontColor,
          fontWeight,
          fontSize: 30,
          marginBottom: -3
        }}
      >
        {parseInt(pounds).toLocaleString()}
      </Text>
      <Text style={{ color: fontColor }}>.</Text>
      <Text style={{ color: fontColor, fontWeight, fontSize: 18 }}>
        {pence}
      </Text>
    </View>
  );
};

export default Amount;
