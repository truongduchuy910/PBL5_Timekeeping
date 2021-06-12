import React from "react";
import { Image, Text, View } from "react-native";
import ButtonWithIcon from "../../components/Button/WithIcon";
import { styles } from "../../styles/styles";
import { screens } from "../config";

export default function UI({
  authenticatedUser,
  resultSignOutMutation,
  pressSignOut,
  navigation,
  work,
}) {
  return (
    <View style={styles.HomeContainer}>
      <View style={styles.profile}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/icons/avatar.png")}
        ></Image>
        <Text style={styles.name}>Hello, {authenticatedUser?.name}!</Text>
      </View>
      {work && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>
            🎉 You checked in at{" "}
            {new Date(work.createdAt).toLocaleString("vi-VN")}
          </Text>
        </View>
      )}
      <View style={styles.boxContainer}>
        <ButtonWithIcon
          onPress={() =>
            navigation.navigate(screens.TIMEKEEPER, {
              screen: screens.TIMEKEEPER,
            })
          }
          source={require("../../assets/icons/timekeeper.png")}
          value={"Your Workdays"}
        />
        <ButtonWithIcon
          onPress={(e) =>
            navigation.navigate(screens.SALARY, {
              screen: screens.SALARY,
            })
          }
          source={require("../../assets/icons/salary.png")}
          value={"Your Salary"}
        />
        <ButtonWithIcon
          onPress={() =>
            navigation.navigate(screens.COMPLAINT, {
              screen: screens.COMPLAINT,
            })
          }
          source={require("../../assets/icons/complaint.png")}
          value={"New Complaint"}
        />
        <ButtonWithIcon
          onPress={pressSignOut}
          source={require("../../assets/icons/logout.png")}
          value={resultSignOutMutation.loading ? "Loading" : "Log Out"}
        />
      </View>
    </View>
  );
}
