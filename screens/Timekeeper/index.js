import UI from "./UI";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
export const SHIFTS_QUERY = gql`
  query ($where: ShiftWhereInput) {
    allShifts(where: $where) {
      id
      checkin
      checkout
    }
  }
`;
export default function TimekeeperScreen({ navigation }) {
  const [date, setDate] = useState({});
  const checkin_lt = date?.timestamp
    ? new Date(date?.timestamp).toISOString()
    : null;
  const { loading, error, data } = useQuery(SHIFTS_QUERY, {
    variables: { where: { checkin_lt } },
  });
  if (loading || error) return "loading...";
  const { allShifts } = data;
  const onSelectDate = (date) => {
    setDate(date);
  };
  return (
    <UI
      allShifts={allShifts}
      navigation={navigation}
      onSelectDate={onSelectDate}
    />
  );
}
