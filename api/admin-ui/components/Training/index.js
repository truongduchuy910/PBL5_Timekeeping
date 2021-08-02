import React from "react";
import { useEffect, useState } from "react";
import TFace from "../../../api";

export default function Training({ url }) {
  const [status, setStatus] = useState();
  const tface = new TFace(url);
  useEffect(async () => {
    setTimeout(async () => {
      const _status = await tface.isAvailable();
      setStatus(_status);
    }, 1000);
  });
  return (
    <div>
      <small>{status ? "done" : "training"}</small>
    </div>
  );
}
