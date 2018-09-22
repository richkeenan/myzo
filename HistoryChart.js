import React from "react";
import { View, Text } from "react-native";
import { Defs, Stop, LinearGradient } from "react-native-svg";
import { VictoryArea, VictoryStack, VictoryGroup } from "victory-native";
import Amount from "./Amount";

const AccountBalance = ({ balance }) => (
  <View style={{ margin: 10 }}>
    <Amount color="white" fontWeight="300" showCurrency amount={balance} />
    <Text style={{ fontSize: 10, color: "grey" }}>ACCOUNT BALANCE</Text>
  </View>
);

const SpentToday = ({ spentToday }) => (
  <View style={{ margin: 10 }}>
    <Amount color="white" fontWeight="300" showCurrency amount={spentToday} />
    <Text style={{ textAlign: "right", fontSize: 10, color: "grey" }}>
      SPENT TODAY
    </Text>
  </View>
);

const HistoryChart = ({ balance, spentToday, transactions }) => {
  const currentBalance = -balance;
  let cumBalance = balance;
  const data = transactions.map(t => {
    const d = { x: new Date(t.created), y: cumBalance / 10000 };

    cumBalance -= t.amount;
    return d;
  });

  const min = Math.min(...data.map(d => d.y));
  const max = Math.max(...data.map(d => d.y));

  return (
    <View style={{ borderWidth: 1, backgroundColor: "#032151" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AccountBalance balance={currentBalance} />
        <SpentToday spentToday={spentToday} />
      </View>

      <View style={{ marginTop: 10 }}>
        <VictoryGroup height={70} padding={0}>
          <Defs>
            <LinearGradient
              id="gradientStroke"
              x1="0%"
              x2="0%"
              y1="0%"
              y2="100%"
            >
              <Stop offset="0%" stopColor="#032151" stopOpacity="1" />
              <Stop offset="90%" stopColor="#2064a0" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <VictoryStack data={data} scale={{ x: "time" }} padding={0}>
            <VictoryArea
              domain={{ y: [min - min * 0.01, max] }}
              data={data}
              style={{
                data: {
                  fill: "url(#gradientStroke)",
                  stroke: "white",
                  strokeWidth: 1
                }
              }}
            />
          </VictoryStack>
        </VictoryGroup>
      </View>
    </View>
  );
};

export default HistoryChart;
