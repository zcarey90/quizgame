import React, { useState } from "react";
import IndexcardList from "./IndexcardList";
import "./indexcard.css";

function App() {
  const [indexcards, setIndexcards] = useState(WARMUP_INDEXCARDS);
  return <IndexcardList indexcards={indexcards} />;
}

const WARMUP_INDEXCARDS = [
  {
    id: 1,
    question: "How many states are in the United States of America?",
    answer: "50",
    options: ["43", "25", "37", "70"],
  },
  {
    id: 2,
    question: "What is the name of the planet we live on?",
    answer: "Earth",
    options: ["Earth", "Krypton", "Venus", "Mercury"],
  },
  {
    id: 3,
    question: "How many days are in a week?",
    answer: "7",
    options: ["7", "6", "3", "4"],
  },
];

export default App;
