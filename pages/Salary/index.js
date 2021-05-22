import React, { useState } from "react";
import { Text, View, Picker } from "react-native";
import Container from "../../components/Container";
import { styles } from "../../styles/styles";
export default function SalaryScreen({ navigation }) {
  const getCurrentMonth = () => {
    var month = (new Date().getMonth() + 1).toString();
    if (month < 10) {
      month = "0" + month;
    }
    return month;
  };

  const getCurrentYear = () => {
    return new Date().getFullYear().toString();
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth);
  const [selectedYear, setSelectedYear] = useState(getCurrentYear);

  return (
    <Container>
      <View style={styles.salaryBox}>
        <View style={styles.salaryFirstLine}>
          <Text style={styles.salaryFirstText}>
            {selectedMonth} - {selectedYear}
          </Text>
        </View>
        <View style={styles.salaryLine}>
          <Text style={styles.salaryText}>Workdays: </Text>
          <Text style={styles.salaryNumber}>22 </Text>
        </View>
        <View style={styles.salaryLine}>
          <Text style={styles.salaryText}>Days late for work: </Text>
          <Text style={styles.salaryNumber}>1 </Text>
        </View>
        <View style={styles.salaryLine}>
          <Text style={styles.salaryText}>Days off: </Text>
          <Text style={styles.salaryNumber}>8 </Text>
        </View>
        <View style={styles.salaryLastLine}>
          <Text style={styles.salaryText}>Your salary: </Text>
          <Text style={styles.salaryNumber}>$100,000 </Text>
        </View>
      </View>

      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedMonth(itemValue)
            }
            itemStyle={styles.pickerText}
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
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
            itemStyle={styles.pickerText}
          >
            <Picker.Item label="2019" value="2019" />
            <Picker.Item label="2020" value="2020" />
            <Picker.Item label="2021" value="2021" />
            <Picker.Item label="2022" value="2022" />
          </Picker>
        </View>
      </View>
    </Container>
  );
}
