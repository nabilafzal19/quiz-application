import React, { useState } from "react";
function Button({ setQuestionNumber, count, timerTrack, type, downloadAnswersPDF }) {
  const clickHandler = () => {
    count += 1;
    // SetTimer(120)
    setQuestionNumber(count);
  };
  const clickHandlerPrevious = () => {
    if (count > 1) {
      count -= 1;
      setQuestionNumber(count);
    }

  };
  return (

    <>
      {type === 'download' ? (
        <div className="btn">
          <button className="submit" onClick={downloadAnswersPDF}>
            Download PDF
          </button>
        </div>
      ) : (
        <div className="btn">
          <button className="submit" onClick={clickHandler}>
            Next
          </button>
          <button className="submit" onClick={clickHandlerPrevious} disabled={count <= 0}>
            Prev
          </button>
        </div>
      )}
    </>


  );
}

export default Button;
