import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { styles } from "../../styles/styles";
import React, { useState } from "react";
import Button from "../../components/Button";
import AnimationEmoji from "../../components/Animation/Emoji";
export default function UI({ onSignIn, result, pressAuthor }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const clickSignIn = async (e) => {
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
          {/* <form
            noValidate
            onSubmit={(e) => {
              clickSignIn(e);
              e.preventDefault();
            }}
          > */}
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              onChangeText={setUsername}
              keyboardType={"numeric"}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              onChangeText={setPassword}
              secureTextEntry
              keyboardType={"numeric"}
            />
            <Button
              loading={result.loading}
              onPress={clickSignIn}
              icon={"🚀"}
              value={"Sign In"}
              type="submit"
            />
            {/* <Button
              loading={result?.loading}
              onPress={clickSignIn}
              icon={"🚀"}
              value={"Sign In"}
              type="submit"
            /> */}
          {/* </form> */}
          <Text style={{ marginTop: 13 }}>{result.error?.toString()}</Text>
          {/* {result.error && (
            <Text style={{ marginTop: 13 }}>{result.error?.toString()}</Text>
          )} */}
          {/* <TouchableOpacity
            style={{
              color: "#aaa",
              textAlign: "center",
              marginTop: 21,
            }}
            onPress={pressAuthor}
          >
            <AnimationEmoji
              emojis={["🤦‍♂️ 🙆‍♂️", "🙆‍♂️ 🙋‍♂️", "🙋‍♂️ 🤦‍♂️", "🤷‍♂️ 🤷‍♂️"]}
              as={Text}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
