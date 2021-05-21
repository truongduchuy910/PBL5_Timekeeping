import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "../../styles/styles";
import React, { useState } from "react";
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
        <Text style={styles.welcome}>Welcome,</Text>
        <Text style={styles.subWelcome}>Sign in to continue!</Text>
        <View style={styles.form}>
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
          <TouchableOpacity
            disabled={result.loading}
            style={styles.button}
            onPress={clickSignIn}
          >
            <Text style={styles.buttonText}>
              {result.loading ? "Loading..." : "Sign In"}
            </Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 13 }}>{result.error?.toString()}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
