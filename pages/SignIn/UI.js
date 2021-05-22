import {
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "../../styles/styles";
import React, { useState } from "react";
import Button from "../../components/Button";
export default function UI({ onSignIn, result }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const clickSignIn = async () => {
    // same with above
    const result = await onSignIn({ username, password });
  };
  return (
    <TouchableWithoutFeedback>
      <View style={styles.HomeContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("./logo.png")} style={styles.logo}></Image>
        </View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          Welcome,
        </Text>
        <Text
          style={{
            color: "#aaa",
            textAlign: "center",
            fontSize: 22,
            paddingTop: "2%",
          }}
        >
          Sign in to continue!
        </Text>
        <View
          style={{
            paddingVertical: "10%",
          }}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            loading={result.loading}
            onPress={clickSignIn}
            value={"Sign In"}
          />
          <Text style={{ marginTop: 13 }}>{result.error?.toString()}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
