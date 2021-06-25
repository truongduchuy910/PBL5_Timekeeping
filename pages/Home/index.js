import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { screens } from "../config";
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
    allWorks(first: 1, sortBy: createdAt_DESC) {
      id
      createdAt
      price
      onTime
    }
  }
`;
export default function HomeScreen({ navigation, route }) {
  const client = useApolloClient();
  const [onUserSignOutMutation, resultSignOutMutation] = useMutation(
    UserSignOutMutation,
    {
      onCompleted: (result) => {
        AsyncStorage.removeItem("@author").finally(() => {
          client.resetStore().finally(() => {
            client.clearStore().finally(() => {
              navigation.navigate(screens.SIGNIN);
            });
          });
        });
      },
      onError: (error) => {},
    }
  );
  const { loading, error, data } = useQuery(AuthenticatedUserQuery, {
    onCompleted: (result) => {
      AsyncStorage.getItem("@screen")
        .then((screen) =>
          screen ? navigation.navigate(screen, { screen: false }) : null
        )
        .catch((error) => {})
        .finally(() => {});
    },
    onError: (error) => {
      navigation.navigate(screens.SIGNIN);
    },
  });
  const pressSignOut = () => {
    if (!resultSignOutMutation.loading) onUserSignOutMutation();
  };

  if (loading) return <Splash />;
  if (error) return <Splash error={"Redirecting..."} />;
  const {
    authenticatedUser,
    allWorks: [work],
  } = data;
  return (
    <UI
      authenticatedUser={authenticatedUser}
      resultSignOutMutation={resultSignOutMutation}
      pressSignOut={pressSignOut}
      navigation={navigation}
      work={work}
    />
  );
}
