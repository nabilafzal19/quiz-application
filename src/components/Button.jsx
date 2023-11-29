import React, { useState } from "react";
function Button({ setQuestionNumber, count, SetTimer }) {
  const [prevTime, setPrevTime] = useState()
  const clickHandler = () => {
    count += 1;
    setPrevTime(() => {
      SetTimer((time) => {
        return time;
      })
    })
    SetTimer(120)
    setQuestionNumber(count);
  };
  const clickHandlerPrevious = () => {
    if (count > 1) {
      count -= 1;
      setQuestionNumber(count);
    }

  };
  return (
    <div className="btn">
      <button className="submit" onClick={clickHandler} >
        Next
      </button>
      <button className="submit" onClick={clickHandlerPrevious} disabled={count === 1}>
        Prev
      </button>
    </div>
  );
}

export default Button;
