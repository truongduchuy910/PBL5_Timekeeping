import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { Calendar } from "react-native-calendars";
import Container from "../../components/Container";
export default function TimekeeperScreen({
  loading,
  error,
  allWorks = [],
  onSelectDate,
  date,
  details,
}) {
  const currentMonth = () => {
    return {
      "2021-04-03": { marked: true, dotColor: "red" },
      "2021-04-04": { marked: true, dotColor: "red" },
    };
  };

  const [markedDates, setMarkedDates] = useState(currentMonth);
  const selectDate = (date) => {
    onSelectDate(date);
  };

  const monthChange = (month) => {
    let formattedMonth = month.month.toString();
    if (formattedMonth < 10) formattedMonth = "0" + formattedMonth;
    setMarkedDates({
      "2021-05-01": { marked: true, dotColor: "red" },
      "2021-05-02": { marked: true, dotColor: "red" },
    });
  };

  var worked = useMemo(() => {
    var worked = {};
    if (date && date.dateString)
      worked[date.dateString] = {
        dots: [
          {
            color: "red",
          },
        ],
      };
    allWorks.map((work) => {
      const _date = new Date(work.createdAt);
      const date = `${prefix(_date.getFullYear())}-${prefix(
        _date.getMonth() + 1,
      )}-${prefix(_date.getDate())}`;
      const dot = {
        color: "blue",
      };
      if (worked[date]) worked[date].dots.push(dot);
      else worked[date] = { dots: [dot] };
    });
    return worked;
  }, [allWorks]);
  console.log(worked);
  return (
    <Container>
      <View style={{ display: "flex", height: "100%" }}>
        <Calendar
          markedDates={{ ...worked }}
          markingType={"multi-dot"}
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
        {loading && <Text>Loading...</Text>}
        <View style={{ overflowY: "scroll", height: "100%", flex: 1 }}>
          {details.map((work) => {
            const date = new Date(work.createdAt);
            return (
              <View
                key={work.id}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#24c48a",
                  marginBottom: 13,
                  padding: 14,
                  backgroundColor: "#f5fffb",
                }}
              >
                <Text
                  style={{
                    color: "#24c48a",
                    fontWeight: "bold",
                  }}
                >
                  🎉 You checked in at {date.toLocaleString("vi-VN")}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </Container>
  );
}
function prefix(a) {
  return a > 9 ? a : "0" + a;
}
