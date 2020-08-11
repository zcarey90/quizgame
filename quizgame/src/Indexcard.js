import React, { useState, useEffect, useRef } from "react";

export default function Indexcard({ indexcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const frontX = useRef();
  const backX = useRef();

  function setMaximumHeight() {
    const frontHeight = frontX.current.getBoundingClientRect().height;
    const backHeight = backX.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaximumHeight, [
    indexcard.question,
    indexcard.answer,
    indexcard.options,
  ]);

  useEffect(() => {
    window.addEventListener("resize", setMaximumHeight);
    return () => window.removeEventListener("resize", setMaximumHeight);
  }, []);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontX}>
        {indexcard.question}
        <div className="indexcard-options">
          {indexcard.options.map((option) => {
            return <div className="indexcard-option">{option}</div>;
          })}
        </div>
      </div>
      <div className="back" ref={backX}>
        {indexcard.answer}
      </div>
    </div>
  );
}
