import React from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Container from "../../components/Container";
import { styles } from "../../styles/styles";
import { useState } from "react/cjs/react.development";

const month = new Date().getMonth() + 1;
export default function SalaryScreen({ onChange, salary, working, late }) {
  const [selectedLanguage, setSelectedLanguage] = useState(month.toString());
  console.log(onChange);
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
        <Picker.Item label="January" value="01" />
        <Picker.Item label="February" value="02" />
        <Picker.Item label="March" value="03" />
        <Picker.Item label="April" value="04" />
        <Picker.Item label="May" value="05" />
        <Picker.Item label="June" value="06" />
        <Picker.Item label="July" value="07" />
        <Picker.Item label="August" value="08" />
        <Picker.Item label="September" value="09" />
        <Picker.Item label="October" value="10" />
        <Picker.Item label="November" value="11" />
        <Picker.Item label="December" value="12" />
      </Picker>
    </Container>
  );
}
