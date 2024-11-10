import { useCallback, useEffect, useRef, useState } from "react";
import questions from "../questions";
import ProgressBar from "./ProgressBar";

let createInitialQuestion = (id) => ({
    id: id,
    questionId: questions[id].id,
    questionName: questions[id].text,
    answers: questions[id].answers
});

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

export default function Quiz() {
    const [stepQuestion, setStepQuestion] = useState(0);
    const [questionStatus, setQuestionStatus] = useState({});
    const [initialQuestion, setInitialQuestion] = useState({
        id: 0,
        questionId: '',
        questionName: 'loading...',
        answers: [
            '', '', '', ''
        ]
    });
    const [buttonClasses, setButtonClasses] = useState(Array(initialQuestion.answers.length).fill(''));

    const [answers, setAnswers] = useState([]);

    function turnQuestion() {
        let nextId = 0;
        setStepQuestion(prevTurn => { nextId = prevTurn++; return prevTurn++; });
        setInitialQuestion(createInitialQuestion(nextId));
    }

    useEffect(() => {

        let initialQuestionEffect = createInitialQuestion(stepQuestion);

        setInitialQuestion(initialQuestionEffect);

        const newAnswers = initialQuestionEffect.answers.map((answer, index) => ({
            content: answer,
            isCorrect: index === 0,
        }));

        shuffle(newAnswers);

        setAnswers(newAnswers);


        console.table(newAnswers);
        setButtonClasses(Array(newAnswers.length).fill(''));
    }, [stepQuestion]);


    const answerConfirmation = useCallback(
        (isCorrect, index) => {
            const newButtonClasses = [...buttonClasses];
            newButtonClasses[index] = isCorrect ? 'correct' : 'wrong';
            setButtonClasses(newButtonClasses);
        },
        []
    );

    const progress = useRef();

    function answerPicked(isCorrect, index) {
        setQuestionStatus({
            status: 'picked',
            index: index,
            isCorrect: isCorrect
        });

        console.log(questionStatus.status)

        // progress.current.classList.add('answered')
        // useEffect(() => {
        //     const confirmationTime = setInterval(() => {
        //         setRemainingTime((prevTime) => {
        //             if (prevTime <= 0) {
        //                 progress.current.classList.remove('answered');
        //                 clearInterval(confirmationTime);
        //                 setRemainingTime(100);
        //                 answerConfirmation(isCorrect, index);
        //                 return;
        //             }
        //             return prevTime - .1;
        //         });
        //     }, 5);

        //     return () => {
        //         progress.current.classList.remove('answered');
        //         clearInterval(confirmationTime);
        //         setRemainingTime(100);
        //         answerConfirmation(isCorrect, index);
        //     }
        // }, []);
    }


    const timer = 3000;

    return (
        <div id="question">
            {questionStatus.status == 'confirmation' && <ProgressBar buttonChange={answerConfirmation} turnQuestion={turnQuestion} status={questionStatus.status} answerData={questionStatus} setStatus={setQuestionStatus} timer={timer} />}
            {questionStatus.status == 'picked' && <ProgressBar buttonChange={answerConfirmation} status={questionStatus.status} answerData={questionStatus} setStatus={setQuestionStatus} timer={timer} />}

            <h2>{initialQuestion.questionName}</h2>
            <ul id="answers">
                {answers.map((question, index) => (
                    <li key={index} className="answer">
                        <button className={buttonClasses[index]} onClick={() => { answerPicked(question.isCorrect, index) }}>
                            {question.content}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}