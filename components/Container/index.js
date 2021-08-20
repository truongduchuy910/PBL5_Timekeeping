import React from "react";
import { View } from "react-native";

export default function Container({ children }) {
  return (
    <View
      style={{
        padding: 30,
        backgroundColor: "transparent",
        flex: 1,
      }}
    >
      {children}
    </View>
  );
}
