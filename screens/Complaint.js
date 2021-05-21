import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { styles } from "../styles/styles";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import ComplaintModal from "../modals/Complaint";
export default function ComplaintScreen({ navigation }) {
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

  const [date, setDate] = useState(getCurrentDay);

  const [isModalShow, setIsModalShow] = useState(false);

  const pickDate = (date) => {
    setDate(date.dateString);
    setIsModalShow(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Modal visible={isModalShow} animationType="slide">
          <ComplaintModal pickDate={pickDate} />
          <TouchableOpacity onPress={() => setIsModalShow(false)}>
            <Ionicons
              name="close"
              size={16}
              style={styles.modalToggle}
              color="#24c48a"
            />
          </TouchableOpacity>
        </Modal>
        <View style={styles.complaintForm}>
          <View>
            <Text style={styles.contactText}>
              If you are having any problems with Timekeeper system, please fill
              in this form and we will solve your issue immediately.
            </Text>
          </View>
          <View style={styles.complaintView}>
            <Text style={styles.complaintDateInput}>{date}</Text>
            <TouchableOpacity
              style={{ marginLeft: "auto" }}
              onPress={() => {
                setIsModalShow(true);
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
            style={styles.complaintMessageInput}
            placeholder="Your Message"
          />
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>SEND NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
