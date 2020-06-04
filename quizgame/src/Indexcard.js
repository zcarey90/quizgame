import React, { useState } from "react";

export default function Indexcard({ indexcard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front">
        {indexcard.question}
        <div className="indexcard-options">
          {indexcard.options.map((option) => {
            return <div className="indexcard-option">{option}</div>;
          })}
        </div>
      </div>
      <div className="back">{indexcard.answer}</div>
    </div>
  );
}
