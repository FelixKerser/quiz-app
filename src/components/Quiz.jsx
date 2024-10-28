import { useReducer } from "react";

const initialQuestion = {
    questionName: '123',
    answers: [
        '123',
        '123',
        '123'
    ]
};

function questionReducer(state, action) {
    switch (action.type) {
        case 'increment':
            console.log('test');
    }
}

export default function Quiz() {

    const [currentQuestion, dispatchQuestion] = useReducer(questionReducer, initialQuestion);

    return (
        <div id="question">
            <h2>123</h2>
            <ul id="answers">
                <li className="answer">
                    <button>
                        213
                    </button>
                </li>
            </ul>
        </div>
    )
}