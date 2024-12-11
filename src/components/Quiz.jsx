import { useCallback, useEffect, useRef, useState } from "react";
import questions from "../questions";
import ProgressBar from "./ProgressBar";
import Results from "./Results";

let createInitialQuestion = (id) => ({
    id: id,
    questionId: questions[id].id,
    questionName: questions[id].text,
    answers: questions[id].answers
});

const allQuestionsCount = questions.length;

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
    const [results, setResults] = useState({
        correctAnswers: 0,
        allAnswers: allQuestionsCount,
    });
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
        if(questions[nextId]){
            setStepQuestion(prevTurn => { nextId = prevTurn++; return prevTurn++; });
            setInitialQuestion(createInitialQuestion(nextId));
        } else {

        }
    }

    useEffect(() => {
        if(questions[stepQuestion]){
            let initialQuestionEffect = createInitialQuestion(stepQuestion);

            setInitialQuestion(initialQuestionEffect);

            const newAnswers = initialQuestionEffect.answers.map((answer, index) => ({
                content: answer,
                isCorrect: index === 0
            }));

            shuffle(newAnswers);

            setAnswers(newAnswers);

            setButtonClasses(Array(newAnswers.length).fill(''));
        }
    }, [stepQuestion]);


    const answerConfirmation = useCallback(
        (isCorrect, index) => {
            // Найти индекс правильного ответа
            const correctAnswer = initialQuestion.answers[0];
            // Создать массив классов с учётом правильного и выбранного ответа
            const correctAnswerIndex = answers.findIndex((answer) => answer.isCorrect);
            const newButtonClasses = initialQuestion.answers.map((question, i) => {
                if (i === index) return isCorrect ? 'correct' : 'wrong'; // Выбранный ответ
                if (i == correctAnswerIndex) {
                    return 'correct'
                } // Подсветить правильный ответ
                return ''; // Остальные кнопки остаются без изменений
            });

            setButtonClasses(newButtonClasses);
        },
        [initialQuestion.answers]
    );


    const progress = useRef();

    function answerPicked(isCorrect, index, content) {
        if(isCorrect){
            setResults( (arr) => { return {
                ...arr,
                correctAnswers: arr.correctAnswers + 1,
            }})
        }
        setQuestionStatus({
            status: 'picked',
            index: index,
            isCorrect: isCorrect,
            content: content
        });
    }


    const timer = 3000;
    console.log(`${stepQuestion} ${allQuestionsCount}`)
    if(stepQuestion >= allQuestionsCount){
        return(
            <div id="summary">
                <Results results={results} />
            </div>
        )
    } else {
            return (
                <div id="question">
                    {questionStatus.status == 'confirmation' &&
                        <ProgressBar buttonChange={answerConfirmation} turnQuestion={turnQuestion}
                                     status={questionStatus.status} answerData={questionStatus} setStatus={setQuestionStatus}
                                     timer={timer}/>}
                    {questionStatus.status == 'picked' &&
                        <ProgressBar buttonChange={answerConfirmation} status={questionStatus.status}
                                     answerData={questionStatus} setStatus={setQuestionStatus} timer={timer}/>}
                    <h2>{initialQuestion.questionName}</h2>
                    <ul id="answers">
                        {answers.map((question, index) => (
                            <li key={index} className="answer">
                                <button className={buttonClasses[index]} onClick={() => {
                                    answerPicked(question.isCorrect, index, question.content)
                                }}>
                                    {question.content}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }