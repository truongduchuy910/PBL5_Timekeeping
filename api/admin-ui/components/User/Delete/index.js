import { gql, useMutation } from "@apollo/client";
import React from "react";
export default function UserDelete({ user }) {
  const [onDelete, { loading, error, data }] = useMutation(gql`
    mutation($id: ID!) {
      deleteUser(id: $id) {
        id
      }
    }
  `);
  const clickDelete = (e) => {
    onDelete({ variables: { id: user.id } });
  };
  return <button onClick={clickDelete}>delete</button>;
}
