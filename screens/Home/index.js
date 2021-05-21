import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { author, screens } from "../../App";
import { styles } from "../../styles/styles";
import Splash from "../Splash";
export const HomeQuery = gql`
  query {
    authenticatedUser {
      id
      name
    }
  }
`;
export default function HomeScreen({ navigation, route }) {
  const { loading, error, data } = useQuery(HomeQuery);
  if (loading || error) return <Splash />;
  const { authenticatedUser } = data;
  return (
    <View style={styles.HomeContainer}>
      <View style={styles.profile}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/icons/avatar.png")}
        ></Image>
        <Text style={styles.name}>Hello, {authenticatedUser?.name}!</Text>
      </View>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>
          🎉 You checked in at 08:22 04-05-2021
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate(screens.TIMEKEEPER)}
        >
          <Image
            source={require("../../assets/icons/timekeeper.png")}
            style={styles.icon}
          ></Image>
          <Text style={styles.boxText}>Your Workdays</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={(e) => navigation.navigate(screens.SALARY)}
        >
          <Image
            source={require("../../assets/icons/salary.png")}
            style={styles.icon}
          ></Image>
          <Text style={styles.boxText}>Your Salary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate(screens.COMPLAINT)}
        >
          <Image
            source={require("../../assets/icons/complaint.png")}
            style={styles.icon}
          ></Image>
          <Text style={styles.boxText}>New Complaint</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            navigation.navigate(screens.SIGNIN);
          }}
        >
          <Image
            source={require("../../assets/icons/logout.png")}
            style={styles.icon}
          ></Image>
          <Text style={styles.boxText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
