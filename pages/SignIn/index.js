import React, { useState } from "react";
import UI from "./UI";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { author, screens } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticatedUserQuery } from "../Home";
import Splash from "../Splash";
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
  const [onUserSignInMutation, result] = useMutation(UserSignInMutation, {
    onError: (error) => {
      console.log("Error UserSignInMutation");
      setErrors((errors) => [...errors, error]);
    },
    onCompleted: (result) => {
      console.log("Result UserSignInMutation");
      const { authenticate } = result;
      if (authenticate?.item) {
        author(authenticate);
        AsyncStorage.setItem("@author", JSON.stringify(authenticate))
          .catch((error) => {
            setErrors((errors) => [...errors, error]);
          })
          .finally(refetch);
      }
      client.resetStore().finally(() => {
        client.clearStore().finally(() => {
          navigation.navigate(screens.HOME);
        });
      });
    },
  });
  const { loading, error, data, refetch } = useQuery(AuthenticatedUserQuery, {
    onCompleted: (result) => {
      console.log("Result AuthenticatedUserQuery");
      if (result?.authenticatedUser) navigation.navigate(screens.HOME);
    },
    onError: (error) => {
      console.log("Error AuthenticatedUserQuery", error);
      AsyncStorage.removeItem("@author").finally(() => {
        client
          .resetStore()
          .finally(() => {
            client
              .clearStore()
              .finally(() => {})
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  });
  const onSignIn = ({ username, password }) => {
    if (!result.loading) {
      setErrors([]);
      onUserSignInMutation({
        variables: { identity: username, secret: password },
      });
    }
  };
  const pressAuthor = () => {
    navigation.navigate(screens.AUTHOR);
  };
  if (loading) return <Splash />;
  console.log(error);
  console.log(result.error);
  return (
    <UI
      onSignIn={onSignIn}
      result={result}
      pressAuthor={pressAuthor}
      errors={errors}
    />
  );
}
