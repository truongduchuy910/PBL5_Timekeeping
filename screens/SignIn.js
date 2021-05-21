import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "../styles/styles";
import { AuthContext, screens } from "../App";
import { HOME } from "./Home";
export const SIGNIN = "SignIn";
export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  return (
    <TouchableWithoutFeedback
    //onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.HomeContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
          ></Image>
        </View>
        <Text style={styles.welcome}>Welcome,</Text>
        <Text style={styles.subWelcome}>Sign in to continue!</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            // value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            // value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate(screens.HOME);
            }}
          >
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
