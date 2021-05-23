import React from "react";
import { Text, TouchableOpacity } from "react-native";
export default function Button({ loading, value = "button", onPress }) {
  return (
    <TouchableOpacity
      disabled={loading}
      style={{
        backgroundColor: "#24c48a",
        borderRadius: 8,
        width: "50%",
        marginLeft: "25%",
        marginTop: 5,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "#fff",
          padding: 10,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 14,
        }}
      >
        {loading ? "Loading..." : value}
      </Text>
    </TouchableOpacity>
  );
}
