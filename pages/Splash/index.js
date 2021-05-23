import React from "react";
import { Text, View } from "react-native";
export default function Splash({ error }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{error ? error.toString() : "Loading..."}</Text>
    </View>
  );
}
