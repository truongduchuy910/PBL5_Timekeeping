import React from "react";

import { Fragment, useEffect } from "react";
import { CreateItem } from "@keystonejs/app-admin-ui/components";
import Logo from "./logo.svg";
export default {
  listHeaderActions: () => (
    <div>
      <CreateItem />
    </div>
  ),
  logo: () => {
    return (
      <Fragment>
        <div style={{ textAlign: "end", color: "#6c757d" }}>
          <img src={Logo} style={{ maxWidth: 300 }} />
          <p style={{ maxWidth: 400 }}>
            Created and developed by students of Da Nang University of Science
            and Technology
          </p>
          <a style={{ maxWidth: 400, color: "#094a5a" }} href="tel:0372672048">
            Liên hệ Trần Ngọc Huy: 0372672048.
          </a>
        </div>
      </Fragment>
    );
  },
  pages: (props) => {
    return [
      { listKey: "Report", label: "# Report" },
      { listKey: "Shift", label: "# Shift" },
      { listKey: "User", label: "# User" },
      // { listKey: "Work", label: "# Work" },
    ];
  },
};
