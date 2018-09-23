import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const Amount = ({ amount, showCurrency, color, fontWeight = "200" }) => {
  const amountString =
    amount < 0 ? (amount * -1).toString() : amount.toString();
  const pounds =
    amountString.length < 3
      ? "0"
      : amountString.slice(0, amountString.length - 2);
  const pence = amountString.slice(amountString.length - 2).padEnd(2, "0");
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

Amount.propTypes = {
  amount: PropTypes.number.isRequired,
  fontWeight: PropTypes.string,
  showCurrency: PropTypes.bool,
  color: PropTypes.string
};

export default Amount;
