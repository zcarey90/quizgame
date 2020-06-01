import React, { useState } from "react";

export default function Indexcard({ indexcard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div onClick={() => setFlip(!flip)}>
      {flip ? indexcard.answer : indexcard.question}
    </div>
  );
}
