import React, { useEffect, useState } from 'react';

const ProgressBar = ({ timer, status, turnQuestion, setStatus, buttonChange, answerData }) => {
    if (status === 'confirmation') {
        const [remainingTime, setRemainingTime] = useState(timer);

        useEffect(() => {
            buttonChange(answerData.isCorrect, answerData.index);
            const analyzeTime = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(analyzeTime);
                        console.log('over');
                        setStatus({});
                        turnQuestion();
                        return prevTime;
                    }
                    return prevTime - 10;
                });

            }, 10);

            return () => {
                clearInterval(analyzeTime);
            };
        }, []);

        return <progress value={remainingTime} max={timer} />;
    }

    if (status === 'picked') {
        const [remainingTime, setRemainingTime] = useState(timer);

        useEffect(() => {
            const confirmationTime = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(confirmationTime);
                        console.log('correcto');
                        setStatus((prevStatusObj) => {
                            return {
                                ...prevStatusObj,
                                status: 'confirmation'
                            }
                        });
                        return prevTime;
                    }
                    return prevTime - 10;
                });
            }, 10);

            return () => {
                clearInterval(confirmationTime);
                setRemainingTime(timer);
            };
        }, []);

        return <progress className="answered" value={remainingTime} max={timer} />;
    }
};

export default ProgressBar;
