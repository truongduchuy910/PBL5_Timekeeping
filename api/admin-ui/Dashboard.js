import { gql, useQuery } from "@apollo/client";
import React, { useCallback, useMemo, useState } from "react";
import TFace from "../api";
import UserList from "./components/User/List";
import { ThemeProvider, Box } from "@primer/components";

export default function Dashboard() {
  const { loading, error, data = { allTFaces: [{}] } } = useQuery(gql`
    query {
      allTFaces {
        id
        url
      }
    }
  `);
  const tface = useCallback(() => new TFace(), [url]);
  const {
    allTFaces: [{ url }],
  } = data;
  const onTrain = (allUsers) => {
    console.log(url, allUsers);
  };
  const userlist = useMemo(() => <UserList onTrain={onTrain} />, [data]);

  if (loading) return "loading...";
  if (error) return error.toString();
  return (
    <ThemeProvider>
      <Box p={2}>{userlist}</Box>
    </ThemeProvider>
  );
}
