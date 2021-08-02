import React from "react";
import { useEffect, useState } from "react";
import TFace from "../../../api";

export default function Training({ url }) {
  const [status, setStatus] = useState();
  const tface = new TFace(url);
  useEffect(async () => {
    try {
      const _status = await tface.isAvailable();
      setStatus(_status);
    } catch (e) {
      setStatus(falsei);
    }
  });
  return (
    <div>
      <small>{status ? "done" : "training"}</small>
    </div>
  );
}
