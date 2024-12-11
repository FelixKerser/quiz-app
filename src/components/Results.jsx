function Results({results}){
        const percent = (results.correctAnswers / results.allAnswers) * 100

    return(
        <div>
            <h2>Summary</h2>
            <span>{results.correctAnswers}</span> / {results.allAnswers} <br/>
            <span className={`user-answer ${percent >= 50 ? "correct" : 'wrong'}`}>{percent}%</span>
        </div>
    )
}

export default Results;