import React, { useState, Fragment } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

import Container from "../../components/Container";
import Button from "../../components/Button";
export default function ComplaintScreen({ navigation, clickCreate, result }) {
  const [day, setDay] = useState({ dateString: "" });
  const [message, setMessage] = useState("");
  function pressSend() {
    clickCreate(`${day.dateString}: ${message}`).then((data) => {
      setMessage("");
      console.log(data);
    });
  }
  return (
    <Container>
      <View
        style={{
          width: "80%",
          marginLeft: "10%",
        }}
      >
        <Calendar
          markedDates={{
            [day.dateString]: {
              dots: [
                {
                  color: "red",
                },
              ],
            },
          }}
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
          onDayPress={(day) => {
            setDay(day);
          }}
          firstDay={1}
        />
        {/* <View>
          <Text
            style={{
              marginTop: 12,
              marginBottom: 25,
              color: "#888",
              lineHeight: 18,
              fontSize: 13,
              paddingBottom: 13,
              borderBottomWidth: 1,
            }}
          >
            If you are having any problems with Timekeeper system, please fill
            in this form and we will solve your issue immediately.
          </Text>
        </View> */}

        {result?.data?.createReport ? (
          <Fragment>
            <Text
              style={{
                marginTop: 13,
                color: "#888",
                textAlign: "center",
              }}
            >
              🎉 Created successfully
            </Text>
            <Text style={{ textAlign: "center", margin: 8 }}>
              {result?.data?.createReport.message}
            </Text>
            <Text
              style={{
                color: "#888",
                textAlign: "center",
              }}
            >
              We will always try to deal with your complaint quickly.
            </Text>
          </Fragment>
        ) : (
          <Fragment>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#eee",
                marginBottom: 12,
                borderRadius: 8,
                padding: 10,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#666",
                }}
              >
                {day.dateString}
              </Text>
              <TouchableOpacity
                style={{ marginLeft: "auto" }}
                onPress={() => {
                  // setIsModalShow(true);
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={16}
                  color="#24c48a"
                />
              </TouchableOpacity>
            </View>
            <TextInput
              style={{
                fontSize: 14,
                color: "#666",
                borderWidth: 1,
                borderColor: "#eee",
                marginBottom: 12,
                borderRadius: 8,
                padding: 10,
                backgroundColor: "white",
              }}
              value={message}
              placeholder="Your Message"
              onChangeText={setMessage}
            />
            {!result?.loading && (
              <Button value={"SEND NOW"} onPress={pressSend} />
            )}
          </Fragment>
        )}
      </View>
    </Container>
  );
}
