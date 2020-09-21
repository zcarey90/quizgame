import React, { useState, useEffect, useRef } from "react";
import IndexcardList from "./IndexcardList";
import "./indexcard.css";
import axios from "axios";

function App() {
  const [indexcards, setIndexcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryA = useRef();
  const amountA = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  useEffect(() => {
    axios.get("http://opentdb.com/api.php?amount=15").then((res) => {
      setIndexcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement(`textarea`);
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountA.current.value,
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
              id: `${index}-$(Date.now()}`,
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="amount">Number of questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={15}
            ref={amountA}
          />
        </div>
        <div className="form-group">
          <button className="button">Populate</button>
        </div>
      </form>
      <div className="container">
        <IndexcardList indexcards={indexcards} />
      </div>
    </>
  );
}

export default App;
