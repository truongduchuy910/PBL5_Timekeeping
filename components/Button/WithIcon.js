import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

export default function ButtonWithIcon({ source, onPress, value }) {
  return (
    <TouchableOpacity
      style={{
        marginBottom: 12,
        borderRadius: 20,
        paddingTop: 32,
        paddingBottom: 22,
        width: "48%",
        alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#666",
        shadowOffset: {
          width: 7,
          height: 7,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 1,
      }}
      onPress={onPress}
    >
      <Image
        source={source}
        style={{
          height: 45,
          width: 45,
        }}
      ></Image>
      <Text
        style={{
          color: "#888",
          paddingTop: 15,
          textAlign: "center",
          fontSize: 12,
          lineHeight: 18,
        }}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
}
