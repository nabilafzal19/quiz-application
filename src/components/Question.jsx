import React, { useState, useEffect } from "react";
import Button from "./button";
import Result from "./Result";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
function Question() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [inputBox, setInputBox] = useState('')
  const [attempts, setAttempts] = useState({})
  const [timer, SetTimer] = useState(120)
  const [timerTrack, setTimerTrack] = useState({})
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
      option3: 'Never',
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
  useEffect(() => {
    if (questionNumber > quetionsArray.length) return;

    const currentTimer = timerTrack[questionNumber] || 120;

    const timerInterval = setInterval(() => {
      setTimerTrack((prevTimerTrack) => {
        if (prevTimerTrack[questionNumber] === 0) {
          setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
        }
        return {
          ...prevTimerTrack,
          [questionNumber]: currentTimer,
        }
      });

      setTimerTrack((prevTimerTrack) => {
        if (prevTimerTrack[questionNumber] - 1 === 0) {
          setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
        }
        return {
          ...prevTimerTrack,
          [questionNumber]: prevTimerTrack[questionNumber] - 1,
        }
      }
      );
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [questionNumber, timerTrack]);

  // useEffect(() => {
  //   if (questionNumber > quetionsArray.length) return
  //   let time = 120
  //   const timerInterval = setInterval(() => {
  //     SetTimer((prevTimer) => {
  //       if (timerTrack[questionNumber]) return timerTrack[questionNumber]
  //       if (prevTimer === 0) {
  //         setQuestionNumber((questionNumber) => {
  //           return questionNumber + 1
  //         })
  //         return 120
  //       }

  //       time = prevTimer - 1
  //       return time
  //     })

  //   }, 1000)
  //   setTimerTrack(prevTime => ({ ...prevTime, [questionNumber]: time - 1 }))
  //   return () => clearInterval(timerInterval);
  // }, [questionNumber])
  // console.log("timer", timerTrack)
  // console.log("attempts", attempts)
  // console.log('map', attempts)
  const inputHandler = (e) => {
    console.log(e.target.value)
    setInputBox(e.target.value)
  }

  const downloadAnswersPDF = () => {
    const pdf = new jsPDF();
    let yPos = 20;

    pdf.text("Quiz Answers", 20, yPos);
    yPos += 20;

    for (let i = 0; i < quetionsArray.length; i++) {
      const questionText = `Question ${i + 1}: ${quetionsArray[i].quetion}`;
      let userAnswer = "0";
      let answer = "0";

      if (attempts[i + 1])
        userAnswer = `Your Answer: ${attempts[i + 1]}`;
      else
        userAnswer = 'Not attempted'
      if (i < correctAnswer.length) {
        answer = `Correct Answer: ${correctAnswer[i]}`;
      }
      pdf.text(questionText, 20, yPos);
      yPos += 10;
      pdf.text(userAnswer, 20, yPos);
      yPos += 10;
      pdf.text(answer, 20, yPos);
      yPos += 15;
    }
    pdf.save("quiz_answers.pdf");
  };


  return (
    <>
      <h1>Quiz App</h1>
      {(questionNumber <= quetionsArray.length) ?

        <div className="card">
          <div className="content">
            <h3>Question {questionNumber}</h3>
            <p className="quetion">{quetionsArray[questionNumber - 1].quetion}</p>
            <div className="list">
              <ul className="list-options">
                <input type="radio" onChange={inputHandler} name="options"
                  value={quetionsArray[questionNumber - 1].option1}
                  checked={attempts[questionNumber] === quetionsArray[questionNumber - 1].option1} />
                {quetionsArray[questionNumber - 1].option1}
              </ul>
              <ul className="list-options">
                <input type="radio" onChange={inputHandler} name="options"
                  value={quetionsArray[questionNumber - 1].option2}
                  checked={attempts[questionNumber] === quetionsArray[questionNumber - 1].option2} />
                {quetionsArray[questionNumber - 1].option2}
              </ul>
              <ul className="list-options">
                <input type="radio" onChange={inputHandler} name="options"
                  value={quetionsArray[questionNumber - 1].option3}
                  checked={attempts[questionNumber] === quetionsArray[questionNumber - 1].option3}
                />
                {quetionsArray[questionNumber - 1].option3}
              </ul>
              <ul className="list-options">
                <input type="radio" onChange={inputHandler} name="options"
                  value={quetionsArray[questionNumber - 1].option4}
                  checked={attempts[questionNumber] === quetionsArray[questionNumber - 1].option4} />
                {quetionsArray[questionNumber - 1].option4}
              </ul>
            </div>
          </div>

          <Button setQuestionNumber={setQuestionNumber} count={questionNumber} timerTrack={timerTrack} />
          <div className="timer">{timerTrack[questionNumber]}</div>
        </div>
        : <Result attempts={attempts} correctAnswer={correctAnswer} downloadAnswersPDF={downloadAnswersPDF} />}

    </>

  );
}

export default Question;
