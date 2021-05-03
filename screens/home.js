import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/styles';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.HomeContainer}>
            <View style={styles.profile}>
                <Image 
                    style={styles.profileImage}
                    source={require('../assets/icons/avatar.png')}>
                </Image>
                <Text style={styles.name}>Hello, Nguyen Kim Huy!</Text>
            </View>
            <View style={styles.notification}>
                <Text style={styles.notificationText}>🎉  You checked in at 08:22 04-05-2021</Text>
            </View>
            <View style={styles.boxContainer}>
                <TouchableOpacity 
                    style={styles.box}
                    onPress={() => navigation.navigate('TimekeeperScreen')}>
                    <Image 
                        source={require('../assets/icons/timekeeper.png')}
                        style={styles.icon}>
                    </Image>
                    <Text style={styles.boxText}>Your Workdays</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.box}
                    onPress={() => navigation.navigate('SalaryScreen')}>
                    <Image 
                        source={require('../assets/icons/salary.png')}
                        style={styles.icon}>
                    </Image>
                    <Text style={styles.boxText}>Your Salary</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.box}
                    onPress={() => navigation.navigate('ComplaintScreen')}>
                    <Image 
                        source={require('../assets/icons/complaint.png')}
                        style={styles.icon}>
                    </Image>
                    <Text style={styles.boxText}>New Complaint</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.box}
                    onPress={() => {}}>
                    <Image 
                        source={require('../assets/icons/logout.png')}
                        style={styles.icon}>
                    </Image>
                    <Text style={styles.boxText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
