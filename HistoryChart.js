import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { Defs, Stop, LinearGradient } from "react-native-svg";
import {
  VictoryArea,
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryStack,
  VictoryGroup
} from "victory-native";
import Amount from "./Amount";

const AccountBalance = ({ balance }) => (
  <View style={{ margin: 10 }}>
    <Amount color="white" fontWeight="300" showCurrency amount={balance} />
    <Text style={{ fontSize: 10, color: "grey" }}>ACCOUNT BALANCE</Text>
  </View>
);
AccountBalance.propTypes = {
  balance: PropTypes.number.isRequired
};

const SpentToday = ({ spentToday }) => (
  <View style={{ margin: 10, alignItems: "flex-end" }}>
    <Amount color="white" fontWeight="300" showCurrency amount={spentToday} />
    <Text style={{ fontSize: 10, color: "grey" }}>SPENT TODAY</Text>
  </View>
);
SpentToday.propTypes = {
  spentToday: PropTypes.number.isRequired
};

const HistoryChart = ({ balance, spentToday, transactions, selectedDate }) => {
  const currentBalance = -balance;
  let cumBalance = balance;
  let selectedBalance = 0;
  const data = transactions.map((t, i) => {
    const d = { x: new Date(t.rawDate), y: cumBalance / 10000 };
    const y = t.data.map(d => d.amount).reduce((prev, curr) => prev + curr, 0);
    cumBalance -= y;

    if (t.rawDate === selectedDate) {
      selectedBalance = d.y;
    }

    return d;
  });

  const min = Math.min(...data.map(d => d.y));
  const max = Math.max(...data.map(d => d.y));

  return (
    <View
      style={{ borderWidth: 1, paddingTop: 20, backgroundColor: "#032151" }}
    >
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
          <VictoryStack
            domain={{ y: [min - min * 0.01, max] }}
            data={data}
            scale={{ x: "time" }}
            padding={0}
          >
            <VictoryArea
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
          {selectedDate &&
            selectedBalance && (
              <VictoryChart
                domain={{ y: [min - min * 0.01, max] }}
                data={data}
                scale={{ x: "time" }}
                padding={0}
              >
                <VictoryLine
                  style={{
                    data: { stroke: "white", strokeWidth: 2 }
                  }}
                  x={() => new Date(selectedDate)}
                />
                <VictoryScatter
                  style={{ data: { fill: "white" } }}
                  data={[
                    {
                      x: new Date(selectedDate),
                      y: selectedBalance,
                      size: 4
                    }
                  ]}
                />
              </VictoryChart>
            )}
        </VictoryGroup>
      </View>
    </View>
  );
};

HistoryChart.propTypes = {
  balance: PropTypes.number.isRequired,
  spentToday: PropTypes.number.isRequired,
  transactions: PropTypes.array.isRequired,
  selectedDate: PropTypes.string
};

export default HistoryChart;
