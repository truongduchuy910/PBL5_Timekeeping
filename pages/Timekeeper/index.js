import UI from "./UI";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const WORKS_QUERY = gql`
  query ($where: WorkWhereInput) {
    allWorks {
      id
      createdAt
    }
    details: allWorks(where: $where) {
      id
      createdAt
    }
  }
`;
export default function TimekeeperScreen({
  navigation,
  route: {
    params: { screen },
  },
}) {
  if (screen) AsyncStorage.setItem("@screen", screen);
  else AsyncStorage.removeItem("@screen");

  const [date, setDate] = useState({
    dateString: new Date().toISOString().slice(0, 10),
  });
  //
  var lt = new Date(date?.timestamp || null);
  lt.setHours(23);
  lt.setMinutes(59);
  const createdAt_lt = lt.toISOString();
  //
  var gt = new Date(date?.timestamp || null);
  gt.setHours(0);
  gt.setMinutes(0);
  const createdAt_gt = gt.toISOString();
  //
  const { loading, error, data, previousData } = useQuery(WORKS_QUERY, {
    variables: { where: { createdAt_lt, createdAt_gt } },
  });

  const onSelectDate = (date) => {
    setDate(date);
  };
  const { allWorks = [], details = [] } = data || previousData || {};
  return (
    <UI
      allWorks={allWorks}
      details={details}
      onSelectDate={onSelectDate}
      date={date}
      loading={loading}
      error={error}
    />
  );
}
