import { gql, useQuery } from "@apollo/client";
import React, { useCallback, useMemo, useState } from "react";
import TFace from "../api";
import UserList from "./components/User/List";
import { ThemeProvider, Box } from "@primer/components";
import Training from "./components/Training";

export default function Dashboard() {
  const { loading, error, data = { allTFaces: [{}] } } = useQuery(gql`
    query {
      allTFaces {
        id
        url
      }
    }
  `);

  const {
    allTFaces: [{ url }],
  } = data;
  const onTrain = async (allUsers) => {
    const tface = new TFace(url);
    console.log("train start");
    await tface.train();
    console.log("train end");
  };
  const userlist = useMemo(() => <UserList url={url} onTrain={onTrain} />, [
    data,
  ]);

  if (loading) return "loading...";
  if (error) return error.toString();
  return (
    <ThemeProvider>
      <Box p={2}>
        <Training url={url} />
        <hr style={{ marginBottom: 34 }} />
        {userlist}
      </Box>
    </ThemeProvider>
  );
}
