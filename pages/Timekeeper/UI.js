import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { Calendar } from "react-native-calendars";
import Container from "../../components/Container";
export default function TimekeeperScreen({ allShifts, onSelectDate }) {
  const currentMonth = () => {
    return {
      "2021-04-03": { marked: true, dotColor: "red" },
      "2021-04-04": { marked: true, dotColor: "red" },
    };
  };

  const [markedDates, setMarkedDates] = useState(currentMonth);

  const selectDate = (day) => {
    onSelectDate(day);
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
    <Container>
      <Text>...</Text>
      {/* <Calendar
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
      /> */}
      {
        // allShifts.map((shift) => {
        //   const date = new Date(shift.checkin);
        //   return (
        //     <View key={shift.id} style={styles.notification}>
        //       <Text style={styles.notificationText}>
        //         🎉 You checked in at
        //         {/* {date.toLocaleString()} */}
        //       </Text>
        //     </View>
        //   );
        // })
      }
    </Container>
  );
}
