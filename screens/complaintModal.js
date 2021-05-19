import React from "react";
import { View } from "react-native";
import { styles } from "../styles/styles";
import { Calendar } from "react-native-calendars";

export default function ComplaintModal({ pickDate }) {
  return (
    <View style={styles.modalContainer}>
      <Calendar
        theme={{
          arrowColor: "#24c48a",
          todayTextColor: "#24c48a",
          textMonthFontWeight: "500",
          monthTextColor: "#24c48a",
          textDayHeaderFontSize: 14,
          textDayFontSize: 14,
          textDayHeaderFontWeight: "500",
          selectedDayBackgroundColor: "#24c48a",
          selectedDayTextColor: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
        }}
        onDayPress={(date) => pickDate(date)}
        firstDay={1}
        style={styles.modalCalendar}
      />
    </View>
  );
}
