import React, { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Container from "../../components/Container";
import { styles } from "../../styles/styles";
const options = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];
const month = new Date().getMonth() + 1;
export default function SalaryScreen({ onChange, salary, working, late }) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    (month < 9 ? "0" : "") + month.toString(),
  );
  console.log(selectedLanguage);
  return (
    <Container>
      <View style={styles.salaryBox}>
        <View style={styles.salaryLine}>
          <Text style={styles.salaryText}>Working time: </Text>
          <Text style={styles.salaryNumber}>{working}</Text>
        </View>
        <View style={styles.salaryLine}>
          <Text style={styles.salaryText}>Late time: </Text>
          <Text style={styles.salaryNumber}>{late}</Text>
        </View>
        <View style={styles.salaryLastLine}>
          <Text style={styles.salaryText}>Your salary: </Text>

          <Text style={styles.salaryNumber}>
            {salary.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </Text>
        </View>
      </View>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue, itemIndex);
          onChange(itemValue);
          setSelectedLanguage(itemValue);
        }}
        style={{
          padding: 12,
          borderRadius: 5,
          backgroundColor: "white",
          borderColor: "rgb(36, 196, 138)",
          fontWeight: "bold",
          color: "rgb(36, 196, 138)",
        }}
      >
        {options.map(({ label, value }) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
    </Container>
  );
}
