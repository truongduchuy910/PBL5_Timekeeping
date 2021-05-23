import React, { Fragment, useState } from "react";
import { useEffect } from "react/cjs/react.development";

export default function AnimationEmoji({
  duration = 500,
  emojis = [],
  as: As = Fragment,
}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const point = setTimeout(() => {
      setIndex((index) => (emojis.length - 1 === index ? 0 : ++index));
    }, duration);
    return () => {
      clearTimeout(point);
    };
  });
  return <As>{emojis[index] || ""}</As>;
}
