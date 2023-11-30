import React from 'react'
import ScoreIndicator from './ScoreIndicator';
import Button from './button';

function Result({ attempts, correctAnswer, downloadAnswersPDF }) {
    const result = () => {
        let score = 0;
        for (let index = 1; index <= Object.keys(attempts).length; index++) {
            if (attempts[index] === correctAnswer[index - 1])
                score++;
        }
        return score
    }
    return (
        <>
            <div className="card">
                <h1 className="completion">Result!</h1>
                <h3>Correct {result()}</h3>
                <h3>Incorrect {correctAnswer.length - result()}</h3>
                <ScoreIndicator value={result()} maxValue={correctAnswer.length} />
            </div>
            <Button downloadAnswersPDF={downloadAnswersPDF} type="download" />
        </>

    )
}

export default Result