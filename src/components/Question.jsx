import React, { useState } from "react";
import Button from "./button";

function Question() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const quetionsArray = [
    "what is the capital of india ?",
    "which flight do you prefer to travel ?",
  ];
  //   const map
  return (
    <div className="card">
      <div className="content">
        <h3>Question {questionNumber}</h3>
        <p className="quetion">{quetionsArray[questionNumber - 1]}</p>
        <div className="list">
          <ul className="list-options">
            <input type="radio" />
            Delhi
          </ul>
          <ul className="list-options">
            <input type="radio" />
            Delhi
          </ul>
          <ul className="list-options">
            <input type="radio" />
            Delhi
          </ul>
          <ul className="list-options">
            <input type="radio" />
            Delhi
          </ul>
        </div>
      </div>
      <Button setQuestionNumber={setQuestionNumber} count={questionNumber} />
    </div>
  );
}

export default Question;
