import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import UI from "./UI";
export const REPORT_CREATE = gql`
  mutation ($data: ReportCreateInput) {
    createReport(data: $data) {
      id
      message
    }
  }
`;
export default function ComplaintScreen({ navigation }) {
  const [onCreate, result] = useMutation(REPORT_CREATE);
  function clickCreate(message) {
    return onCreate({ variables: { data: { message } } });
  }
  return <UI clickCreate={clickCreate} result={result} />;
}
