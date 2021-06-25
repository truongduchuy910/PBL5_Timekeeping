import React, { useState } from "react";
import UI from "./UI";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { author, screens } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticatedUserQuery } from "../Home";
import Splash from "../Splash";
import { useEffect } from "react/cjs/react.development";
export const UserSignInMutation = gql`
  mutation signin($identity: String, $secret: String) {
    authenticate: authenticateUserWithPassword(
      phone: $identity
      password: $secret
    ) {
      token
      item {
        id
      }
    }
  }
`;
export default function SignInScreen({ navigation }) {
  const client = useApolloClient();
  const [errors, setErrors] = useState([]);
  const [onUserSignInMutation, result] = useMutation(UserSignInMutation);
  const { loading, error, data, refetch } = useQuery(AuthenticatedUserQuery);
  const onSignIn = ({ username, password }) => {
    if (!result.loading) {
      return onUserSignInMutation({
        variables: { identity: username, secret: password },
      })
        .then((result) => {
          const {
            data: { authenticate },
          } = result;
          if (authenticate?.item) {
            author(authenticate);
            AsyncStorage.setItem("@author", JSON.stringify(authenticate))
              .catch((error) => {
                setErrors((errors) => [...errors, error]);
              })
              .finally(refetch);
          }
          client.clearStore();
          navigation.navigate(screens.HOME);
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error]);
        })
        .finally(() => {
          client.resetStore();
        });
    }
  };
  const pressAuthor = () => {
    navigation.navigate(screens.AUTHOR);
  };

  if (data?.authenticatedUser) navigation.navigate(screens.HOME);
  if (loading) return <Splash />;
  return (
    <UI
      onSignIn={onSignIn}
      result={result}
      pressAuthor={pressAuthor}
      errors={[...errors, error]}
    />
  );
}
