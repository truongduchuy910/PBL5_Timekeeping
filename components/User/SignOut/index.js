import { gql } from "@apollo/client";

export const UserSignOutMutation = gql`
  mutation {
    unauthenticate: unauthenticateUser {
      success
    }
  }
`;
