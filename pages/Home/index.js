import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, View, Image } from "react-native";
import { screens } from "../config";
import ButtonWithIcon from "../../components/Button/WithIcon";
import { styles } from "../../styles/styles";
import Splash from "../Splash";
export const UserSignOutMutation = gql`
  mutation {
    unauthenticate: unauthenticateUser {
      success
    }
  }
`;
export const AuthenticatedUserQuery = gql`
  query {
    authenticatedUser {
      id
      name
    }
  }
`;
export default function HomeScreen({ navigation, route }) {
  const { loading, error, data } = useQuery(AuthenticatedUserQuery);
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
        <ButtonWithIcon
          onPress={() => navigation.navigate(screens.TIMEKEEPER)}
          source={require("../../assets/icons/timekeeper.png")}
          value={"Your Workdays"}
        />
        <ButtonWithIcon
          onPress={(e) => navigation.navigate(screens.SALARY)}
          source={require("../../assets/icons/salary.png")}
          value={"Your Salary"}
        />
        <ButtonWithIcon
          onPress={() => navigation.navigate(screens.COMPLAINT)}
          source={require("../../assets/icons/complaint.png")}
          value={"New Complaint"}
        />
        <ButtonWithIcon
          onPress={() => {
            navigation.navigate(screens.SIGNIN);
          }}
          source={require("../../assets/icons/logout.png")}
          value={"Log Out"}
        />
      </View>
    </View>
  );
}
