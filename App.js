import * as React from "react";
import React from "react";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const client = new ApolloClient({
  uri: "localhost:4000/graphql",
  cache: new InMemoryCache(),
});
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/home";
import TimekeeperScreen from "./screens/timekeeper";
import SalaryScreen from "./screens/salary";
import ComplaintScreen from "./screens/complaint";
import { styles } from "./styles/styles";

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.HomeContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("./assets/logo.png")}
            style={styles.logo}
          ></Image>
        </View>
        <Text style={styles.welcome}>Welcome,</Text>
        <Text style={styles.subWelcome}>Sign in to continue!</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => signIn({ username, password })}
          >
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const Stack = createStackNavigator();

function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Navigator>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: "Timekeeper Application",
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#24c48a",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ComplaintScreen"
                component={ComplaintScreen}
                options={{ title: "New Complaint" }}
              />
              <Stack.Screen
                name="SalaryScreen"
                component={SalaryScreen}
                options={{ title: "Your Salary" }}
              />
              <Stack.Screen
                name="TimekeeperScreen"
                component={TimekeeperScreen}
                options={{ title: "Your Workdays" }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
AppRegistry.registerComponent("MyApplication", () => App);
export default App;
