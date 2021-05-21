import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/styles";
import { Calendar } from "react-native-calendars";
export default function TimekeeperScreen({ navigation }) {
  const getCurrentDay = () => {
    var date = new Date().getDate();
    if (date < 10) {
      date = "0" + date;
    }
    var month = (new Date().getMonth() + 1).toString();
    if (month < 10) {
      month = "0" + month;
    }
    var year = new Date().getFullYear();
    var today = year + "-" + month + "-" + date;
    return today;
  };

  const currentMonth = () => {
    return {
      "2021-04-03": { marked: true, dotColor: "red" },
      "2021-04-04": { marked: true, dotColor: "red" },
    };
  };

  const [date, setDate] = useState(getCurrentDay);

  const [markedDates, setMarkedDates] = useState(currentMonth);

  const selectDate = (day) => {
    setDate(day.dateString);
  };

  const monthChange = (month) => {
    let formattedMonth = month.month.toString();
    if (formattedMonth < 10) formattedMonth = "0" + formattedMonth;
    console.log(formattedMonth);
    console.log(month.year);
    setMarkedDates({
      "2021-05-01": { marked: true, dotColor: "red" },
      "2021-05-02": { marked: true, dotColor: "red" },
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
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
        onDayPress={(day) => selectDate(day)}
        onMonthChange={(month) => monthChange(month)}
        firstDay={1}
        style={styles.calendar}
      />
      <View style={styles.notification}>
        <Text style={styles.notificationText}>
          🎉 You checked in at 08:22 {date}
        </Text>
      </View>
    </View>
  );
}
