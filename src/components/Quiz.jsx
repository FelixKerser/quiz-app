import { useState } from "react";
import questions from "../questions";

let createInitialQuestion = (id) => ({
    id: id,
    questionName: questions[id].text,
    answers: questions[id].answers
});

export default function Quiz() {
    const [stepQuestion, setStepQuestion] = useState(0);
    const initialQuestion = createInitialQuestion(stepQuestion);

    return (
        <div id="question">
            <h2>{initialQuestion.questionName}</h2>
            <ul id="answers">
                {initialQuestion.answers.map((question, index) => (
                    <li key={index} className="answer">
                        <button>
                            {question}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}