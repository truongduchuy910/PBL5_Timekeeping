import React from "react";
import { Image, ImageBackground, View } from "react-native";
export default function Layout({ children }) {
  const width = 550;
  const height = (width / 715) * 1090;
  return (
    <View
      style={{
        height: "100vh",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center", position: "relative" }}>
        <Image
          source={require("./your-phone.png")}
          style={{
            width: width,
            height: height,
            alignItems: "center",
            position: "absolute",
            zIndex: -1,
          }}
        />
        <View
          style={{
            borderRadius: 50,
            width: width * 0.5948,
            top: height * 0.13,
            height: height * 0.725,
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
}
