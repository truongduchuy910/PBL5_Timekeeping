import React, { useState } from "react";
import UI from "./UI";
import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "../Splash";

export const WORKS_QUERY = gql`
  query ($where: WorkWhereInput) {
    allWorks(where: $where) {
      id
      createdAt
      price
      onTime
    }
  }
`;
var date = new Date();
function getVar(month) {
  //
  var lt = new Date(date.getFullYear(), Number(month), 0);
  const createdAt_lt = lt.toISOString();
  //
  var gt = new Date(date.getFullYear(), Number(month) - 1, 0);
  const createdAt_gt = gt.toISOString();
  const t = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diff = Math.round(Math.abs((lt - gt) / t));
  return { diff, var: { createdAt_lt, createdAt_gt } };
}
export default function SalaryScreen({
  navigation,
  route: {
    params: { screen },
  },
}) {
  if (screen) AsyncStorage.setItem("@screen", screen);
  else AsyncStorage.removeItem("@screen");

  const month = (new Date().getMonth() + 1).toString();
  const initState = getVar(month);
  console.log(initState);
  const [where, setWhere] = useState(initState.var);
  const [diff, setDiff] = useState(initState.diff);
  function onChange(month) {
    const variables = getVar(month);
    setDiff(variables.diff);
    setWhere(variables.var);
  }
  const {
    loading,
    error,
    data = {},
    previousData = {},
  } = useQuery(WORKS_QUERY, {
    variables: { where },
  });
  const { allWorks = [] } = data || previousData;
  var salary = 0;
  var working = allWorks.length;
  var late = 0;
  allWorks.map((work) => {
    if (!work.onTime) late++;
    salary += work.price * (work.onTime ? 1 : 0.99);
  });
  if (loading || error) return <Splash error={error} />;
  return (
    <UI
      onChange={onChange}
      salary={salary}
      working={working}
      late={late}
      diff={diff}
    />
  );
}
