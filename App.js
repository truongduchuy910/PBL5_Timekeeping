import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  makeVar,
} from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { createContext, useEffect, useReducer, useMemo } from "react";
import { setContext } from "@apollo/client/link/context";

/**
 * screen
 */
import Home from "./screens/Home";
import Timekeeper from "./screens/Timekeeper";
import Salary from "./screens/Salary";
import Complaint from "./screens/Complaint";
import SignIn from "./screens/SignIn";
export const screens = {
  HOME: "Home",
  COMPLAINT: "Complaint",
  SALARY: "Salary",
  SIGNIN: "SignIn",
  TIMEKEEPER: "Timekepper",
};
export const author = makeVar({});
const uri = "http://localhost:7009/admin/api";
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  link: setContext((_, { headers }) => {
    const { token } = author();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }).concat(
    new HttpLink({
      uri,
    })
  ),
});
const Stack = createStackNavigator();
function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
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
              animationTypeForReplace: true ? "pop" : "push",
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
      </NavigationContainer>
    </ApolloProvider>
  );
}
AppRegistry.registerComponent("MyApplication", () => App);
export default App;
