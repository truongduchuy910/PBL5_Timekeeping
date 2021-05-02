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
})