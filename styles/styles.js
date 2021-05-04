import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#fff',
        flex: 1,
    },
    HomeContainer: {
        padding: 30,
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: '7%',
        marginTop: '-25%'
    },
    logo: {
        height: 72,
        width: 58,
    },
    welcome: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    subWelcome: {
        color: '#aaa',
        textAlign: 'center',
        fontSize: 22,
        paddingTop: '2%',
    },
    form: {
        paddingVertical: '10%',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 12,
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#24c48a',
        borderRadius: 8,
        width: '50%',
        marginLeft: '25%',
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    boxContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        marginBottom: 12,
        borderRadius: 20,
        paddingTop: 32,
        paddingBottom: 22,
        width: '48%',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: "#666",
        shadowOffset: {
	        width: 7,
	        height: 7,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 1,
    },
    boxText: {
        color: '#888',
        paddingTop: 15,
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 18,
    },
    icon: {
        height: 45,
        width: 45,
    },
    profile: {
        margin: 26,
        alignItems: 'center'
    },
    profileImage: {
        height: 75,
        width: 75,
        borderRadius: 35,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    name: {
        textAlign: 'center',
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
    },
    notification: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#24c48a',
        marginBottom: 30,
        padding: 14,
        backgroundColor: '#f5fffb',
    },
    notificationText: {
        color: '#24c48a',
        fontWeight: 'bold',
    },
    calendar: {
        marginBottom: 20,
    }, 
    salaryBox: {
        borderRadius: 7,
        marginBottom: 30,
        padding: 14,
        backgroundColor: '#fff',
        shadowColor: "#666",
        shadowOffset: {
	        width: 7,
	        height: 7,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 1,
    }, 
    salaryLine: {
        flexDirection: 'row',
        marginBottom: 18,
    },
    salaryText: {
        color: '#777',
    },
    salaryNumber: {
        marginLeft: 'auto',
        fontWeight: 'bold',
        color: '#24c48a',
    },
    salaryLastLine: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
        marginBottom: 5,
    },
    salaryFirstLine: {
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 20,
        marginTop: 10,
    },
    salaryFirstText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#24c48a',
    },
    pickerText: {
        fontSize: 14,
    },
    picker: {
        width: '50%',
    },
    pickerContainer: {
        marginTop: '-5%',
        marginLeft: '10%',
        marginRight: '10%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalCalendar: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '20%',
    },
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'center',
    },
    modalContainer: {
        padding: 30,
        backgroundColor: '#fff',
    },
    contactText: {
        marginTop: 12,
        marginBottom: 25,
        color: '#888',
        lineHeight: 18,
        fontSize: 13,
        borderBottomWidth: 1,
    },
    complaintForm: {
        width: '80%',
        marginLeft: '10%',
    },
    complaintDateInput: {
        fontSize: 14,
        color: '#666',
    },
    complaintView: {
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 12,
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row'
    },
    complaintMessageInput: {
        fontSize: 14,
        color: '#666',
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 12,
        borderRadius: 8,
        padding: 10,
    },
    calendarIcon: {
        width: 20,
        height: 20,
    }, 
})