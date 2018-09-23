import React from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { NativeRouter } from "react-router-native";
import { Navigation, Card } from "react-router-navigation";
import TransactionsCard from "./cards/home/TransactionsCard";
import TransactionDetailsCard from "./cards/details/TransactionDetailsCard";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NativeRouter>
          <Navigation navBarStyle={{ backgroundColor: "white" }}>
            <Card
              hideNavBar
              exact
              path="/"
              render={() => <TransactionsCard />}
            />

            <Card
              renderLeftButton={renderNavBar}
              path="/transaction"
              render={props => <TransactionDetailsCard {...props} />}
            />
          </Navigation>
        </NativeRouter>
      </View>
    );
  }
}

// Todo - make this not horrific
const renderNavBar = props => (
  <TouchableHighlight
    style={{
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    }}
    onPress={props.history.goBack}
  >
    <View>
      <Text>Go Back</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
