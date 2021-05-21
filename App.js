import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { createContext, useEffect, useReducer, useMemo } from "react";
/**
 * screen
 */
import Home from "./screens/Home";
import Timekeeper from "./screens/Timekeeper";
import Salary from "./screens/Salary";
import Complaint from "./screens/Complaint";
import SignIn from "./screens/SignIn";
import Splash from "./screens/Splash";
export const screens = {
  HOME: "Home",
  COMPLAINT: "Complaint",
  SALARY: "Salary",
  SIGNIN: "SignIn",
  TIMEKEEPER: "Timekepper",
};
export const AuthContext = createContext();
const Stack = createStackNavigator();

function App({ navigation }) {
  const client = new ApolloClient({
    uri: "localhost:4000/graphql",
    cache: new InMemoryCache(),
  });
  const [state, dispatch] = useReducer(
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

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
      } catch (e) {}
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
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
            <Splash />
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
                name={screens.SIGNIN}
                component={SignIn}
                options={{
                  title: "Timekeeper Application",
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={screens.HOME}
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screens.COMPLAINT}
                component={Complaint}
                options={{ title: "New Complaint" }}
              />
              <Stack.Screen
                name={screens.SALARY}
                component={Salary}
                options={{ title: "Your Salary" }}
              />
              <Stack.Screen
                name={screens.TIMEKEEPER}
                component={Timekeeper}
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
