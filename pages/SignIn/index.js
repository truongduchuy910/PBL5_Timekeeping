import React, { useState } from "react";
import UI from "./UI";
import { gql, useMutation, useQuery } from "@apollo/client";
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
              .catch(() => {})
              .finally(refetch);
          }
        })
        .catch((e) => {});
    }
  };
  const pressAuthor = () => {
    navigation.navigate(screens.AUTHOR);
  };
  useEffect(() => {
    if (loading) return () => {};
    if (error)
      return () =>
        AsyncStorage.removeItem("@author")
          .catch(() => {})
          .finally(() => author({}));

    const { authenticatedUser } = data;
    if (authenticatedUser?.id) navigation.navigate(screens.HOME);
  });
  if (loading || error) return <Splash error={error} />;
  return <UI onSignIn={onSignIn} result={result} pressAuthor={pressAuthor} />;
}
