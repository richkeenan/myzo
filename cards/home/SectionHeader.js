import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

class SectionHeader extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: "#f4f4f4",
          borderBottomWidth: 1,
          borderColor: "lightgrey"
        }}
      >
        <Text style={{ margin: 5, marginLeft: 10 }}>{this.props.title}</Text>;
      </View>
    );
  }
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default SectionHeader;
