import React, { useState, useEffect, useRef } from "react";
import IndexcardList from "./IndexcardList";
import "./indexcard.css";
import axios from "axios";

function App() {
  const [indexcards, setIndexcards] = useState(WARMUP_INDEXCARDS);
  const [categories, setCategories] = useState([]);

  const categoryA = useRef();
  const quantityA = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  useEffect(() => {}, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: quantityA.current.value,
          category: categoryA.current.value,
        },
      })
      .then((res) => {
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
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="quiz-settings">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryA}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="quiz-settings">
          <label htmlFor="quantity">number of questions</label>
          <input
            type="number"
            id="quantity"
            min="1"
            step="1"
            defaultValue={10}
            ref={quantityA}
          />
        </div>
        <div className="quiz-settings">
          <button className="button">Populate</button>
        </div>
      </form>
      <div className="container">
        <IndexcardList indexcards={indexcards} />
      </div>
    </>
  );
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
