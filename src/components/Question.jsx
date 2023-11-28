import React, { useState, useEffect } from "react";
import Button from "./button";

function Question() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [inputBox, setInputBox] = useState('')
  const [attempts, setAttempts] = useState({})
  const quetionsArray = [
    {
      quetion: "what is the capital of india ?",
      option1: "Delhi",
      option2: 'Bihar',
      option3: 'Bangalore',
      option4: 'Hyderabad'
    },
    {
      quetion: "which flight do you prefer to travel ?",
      option1: "Indigo",
      option2: 'Vistara',
      option3: 'SpiceJet',
      option4: 'AirIndia'
    },
    {
      quetion: "are you on bench since long ?",
      option1: "YES",
      option2: 'NO',
      option3: 'From many months',
      option4: 'Always'
    }


  ];
  const correctAnswer = ["Delhi", "Vistara", "YES"]
  useEffect(() => {
    setAttempts(prevAttempts => ({
      ...prevAttempts,
      [questionNumber]: inputBox
    }));

  }, [inputBox]);

  // console.log("attempts", attempts)
  // console.log('map', attempts)
  const inputHandler = (e) => {
    console.log(e.target.value)
    setInputBox(e.target.value)
  }


  return (
    <>
      {(questionNumber <= quetionsArray.length) ?
        <div className="card">
          <div className="content">
            <h3>Question {questionNumber}</h3>
            <p className="quetion">{quetionsArray[questionNumber - 1].quetion}</p>
            <div className="list">
              <ul className="list-options">
                <input type="radio" onChange={inputHandler} name="options" value={quetionsArray[questionNumber - 1].option1} />
                {quetionsArray[questionNumber - 1].option1}
              </ul>
              <ul className="list-options">
                <input type="radio" onChange={inputHandler} name="options" value={quetionsArray[questionNumber - 1].option2} />
                {quetionsArray[questionNumber - 1].option2}
              </ul>
              <ul className="list-options">
                <input type="radio" onChange={inputHandler} name="options" value={quetionsArray[questionNumber - 1].option3} />
                {quetionsArray[questionNumber - 1].option3}
              </ul>
              <ul className="list-options">
                <input type="radio" onChange={inputHandler} name="options" value={quetionsArray[questionNumber - 1].option4} />
                {quetionsArray[questionNumber - 1].option4}
              </ul>
            </div>
          </div>

          <Button setQuestionNumber={setQuestionNumber} count={questionNumber} />

        </div>
        : <div className="card">
          <h1 className="completion">attempted all questions!</h1>
          <Button setQuestionNumber={setQuestionNumber} count={questionNumber} />
        </div>}

    </>

  );
}

export default Question;
