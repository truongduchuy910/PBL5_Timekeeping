import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "../../styles/styles";
import React, { useMemo, useState } from "react";
import Button from "../../components/Button";
import AnimationEmoji from "../../components/Animation/Emoji";
import Layout from "../../components/Layout";
export default function UI({ onSignIn, result, pressAuthor, errors }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const clickSignIn = useMemo(
    () => (e) => {
      onSignIn({ username, password });
    },
    [username, password],
  );
  return (
    <TouchableWithoutFeedback style={{ backgroundColor: "tranparent" }}>
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
            secureTextEntry={true}
          />

          <Button
            loading={result?.loading}
            onPress={clickSignIn}
            icon={"🚀"}
            value={"Sign In"}
            type="submit"
            css={{ marginBotton: 13 }}
          />
          {errors.map((error, index) => {
            return <Text key={index}>{error?.toString()}</Text>;
          })}
          <TouchableOpacity
            style={{
              color: "#aaa",
              textAlign: "center",
              marginTop: 21,
            }}
            onPress={pressAuthor}
          >
            {/* <AnimationEmoji
              emojis={["🤦‍♂️ 🙆‍♂️", "🙆‍♂️ 🙋‍♂️", "🙋‍♂️ 🤦‍♂️", "🤷‍♂️ 🤷‍♂️"]}
              as={Text}
            /> */}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
