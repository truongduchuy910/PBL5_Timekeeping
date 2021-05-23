import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Text, View, Image } from "react-native";
import { screens } from "../config";
import ButtonWithIcon from "../../components/Button/WithIcon";
import Splash from "../Splash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UI from "./UI";
export const UserSignOutMutation = gql`
  mutation {
    unauthenticate: unauthenticateUser {
      success
    }
  }
`;
export const AuthenticatedUserQuery = gql`
  query {
    authenticatedUser {
      id
      name
    }
  }
`;
export default function HomeScreen({ navigation, route }) {
  const [onUserSignOutMutation, resultSignOutMutation] =
    useMutation(UserSignOutMutation);
  const { loading, error, data } = useQuery(AuthenticatedUserQuery);
  if (loading || error) return <Splash />;
  const { authenticatedUser } = data;
  const pressSignOut = () => {
    if (!resultSignOutMutation.loading)
      onUserSignOutMutation()
        .then((result) => console.info(result))
        .catch((error) => console.error(error))
        .finally(() => {
          AsyncStorage.removeItem("@author").finally(() => {
            navigation.navigate(screens.SIGNIN);
          });
        });
  };

  AsyncStorage.getItem("@screen")
    .then((screen) =>
      screen ? navigation.navigate(screen, { screen: false }) : null
    )
    .catch(() => {})
    .finally(() => {});
  return (
    <UI
      authenticatedUser={authenticatedUser}
      resultSignOutMutation={resultSignOutMutation}
      pressSignOut={pressSignOut}
      navigation={navigation}
    />
  );
}
