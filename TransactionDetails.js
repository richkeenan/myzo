import React from "react";
import { View, Text } from "react-native";
import { MapView } from "expo";

const TransactionDetails = ({ transaction }) => {
  const latitude = transaction.merchant.address.latitude;
  const longitude = transaction.merchant.address.longitude;
  const zoom = transaction.merchant.address.zoom_level;
  const longDelta = 360 / Math.pow(2, zoom);
  const coordinate = {
    latitude,
    longitude
  };

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: longDelta,
        longitudeDelta: longDelta
      }}
    >
      <MapView.Marker coordinate={coordinate} />
    </MapView>
  );
};

export default TransactionDetails;
