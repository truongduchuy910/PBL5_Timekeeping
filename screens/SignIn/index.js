import React, { useState } from "react";
import UI from "./UI";
import { gql, useMutation } from "@apollo/client";
import { author, screens } from "../../App";
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
  const onSignIn = ({ username, password }) => {
    if (!result.loading) {
      return onUserSignInMutation({
        variables: { identity: username, secret: password },
      }).then((result) => {
        const {
          data: { authenticate },
        } = result;
        author(authenticate);
        navigation.navigate(screens.HOME);
      });
    }
  };

  return <UI onSignIn={onSignIn} result={result} />;
}
