import React from "react";
function Button({ setQuestionNumber, count }) {
  const clickHandler = () => {
    count += 1;
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
      <button className="submit" onClick={clickHandler}>
        Next
      </button>
      <button className="submit" onClick={clickHandlerPrevious}>
        Prev
      </button>
    </div>
  );
}

export default Button;
