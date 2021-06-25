import { useApolloClient } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { author } from "../config";
export default function Splash({ error }) {
  const client = useApolloClient();
  if (error) {
    client.clearStore();
    client.resetStore();
    client.restore();
    AsyncStorage.removeItem("@author")
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        author({});
      });
  } else {
  }
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
