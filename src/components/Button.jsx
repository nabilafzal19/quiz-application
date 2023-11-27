import React from "react";
function Button({ setQuestionNumber, count }) {
  const clickHandler = () => {
    count += 1;
    setQuestionNumber(count);
  };
  return (
    <div className="btn">
      <button className="submit" onClick={clickHandler}>
        Next
      </button>
    </div>
  );
}

export default Button;
