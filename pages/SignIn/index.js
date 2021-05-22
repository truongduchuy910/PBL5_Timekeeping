import React, { useState } from "react";
import UI from "./UI";
import { gql, useMutation, useQuery } from "@apollo/client";
import { author, screens } from "../../App";
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
  const { loading, error, data } = useQuery(AuthenticatedUserQuery);
  const onSignIn = ({ username, password }) => {
    if (!result.loading) {
      return onUserSignInMutation({
        variables: { identity: username, secret: password },
      }).then((result) => {
        const {
          data: { authenticate },
        } = result;
        author(authenticate);
        AsyncStorage.setItem("@author", JSON.stringify(authenticate)).finally(
          () => navigation.navigate(screens.HOME)
        );
      });
    }
  };
  useEffect(() => {
    if (loading || error) return;
    const { authenticatedUser } = data;
    if (authenticatedUser.id) navigation.navigate(screens.HOME);
  });
  if (loading || error) return <Splash />;
  return <UI onSignIn={onSignIn} result={result} />;
}
