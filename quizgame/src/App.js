import React, { useState, useEffect } from "react";
import IndexcardList from "./IndexcardList";
import "./indexcard.css";
import axios from "axios";

function App() {
  const [indexcards, setIndexcards] = useState(WARMUP_INDEXCARDS);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setIndexcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: "${index}-$(Date.now()}",
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }
  return <IndexcardList indexcards={indexcards} />;
}

const WARMUP_INDEXCARDS = [
  {
    id: 1,
    question: "How many states are in the United States of America?",
    answer: "50",
    options: ["43", "25", "37", "50"],
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
