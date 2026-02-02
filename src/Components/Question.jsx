import { useState, useEffect } from 'react'
import { getQuizData } from '../data/data'

export default function Question(props) {
    const [data, setData] = useState([])
    const [optionsArr, setOptionsArr] = useState([])
    let numOfCorrect = 0

    useEffect(() => {
        getQuizData().then(apiResponse => {
            setData(apiResponse)
            const shuffledResults = apiResponse.map((ques) => {
                const randNum = Math.floor(Math.random() * (ques.incorrect_answers.length + 1))
                const shuffled = [...ques.incorrect_answers]
                shuffled.splice(randNum, 0, ques.correct_answer)
                return shuffled
            })
            setOptionsArr(shuffledResults)
        })
    }, [])

    function submit(event) {
        event.preventDefault()
        const formEl = event.currentTarget
        const formData = new FormData(formEl)
        props.setIsSubmitted(true)
        props.setUserAnswers(Object.fromEntries(formData.entries()))
    }

    // Guard: Prevent the map from running if arrays aren't ready
    if (data.length === 0 || optionsArr.length === 0) {
        return <h1 className="loading">Loading Quiz...</h1>
    }

    const fieldHtml = data.map((ques, i) => {
        const shuffledOption = optionsArr[i]

        return (
            <fieldset key={i}>
                <legend>{ques.question}</legend>

                {shuffledOption.map((ans, index) => {
                    const numQuestAttempted = Object.keys(props.userAnswers).length
                    let className = []

                    // logic for marking answers after submission
                    if (numQuestAttempted > 0 || props.isSubmitted) {
                        const selectedAnswer = props.userAnswers[`question-${i + 1}`]
                        
                        if (ans === selectedAnswer) {
                            if (ans === ques.correct_answer) {
                                className.push('correct')
                                numOfCorrect += 1
                            } else {
                                className.push('wrong')
                            }
                        }
                        
                        // Highlight the correct answer even if the user didn't pick it
                        if (props.isSubmitted && ans === ques.correct_answer) {
                            className.push('correct')
                        }
                    }

                    if (props.isSubmitted) {
                        className.push("disabled")
                    }

                    return (
                        <label key={index} className={className.join(' ')}>
                            <input 
                                value={ans} 
                                type="radio" 
                                name={`question-${i + 1}`} 
                                disabled={props.isSubmitted}
                            />
                            {ans}
                        </label>
                    )
                })}
                <br />
            </fieldset>
        )
    })

    return (
        <section>
            <form onSubmit={submit}>
                {fieldHtml}

                <p 
                    className="final-score"
                    style={{ visibility: props.isSubmitted ? 'visible' : 'hidden' }}
                >
                    Great effort! You got {numOfCorrect}/{data.length} questions right.
                </p>

                {props.isSubmitted ? (
                    <button 
                        type='button' 
                        className='submit-btn' 
                        onClick={props.playAgain}
                    >
                        Play Again
                    </button>
                ) : (
                    <button type="submit" className='submit-btn'>
                        Check Answer
                    </button>
                )}
            </form>
        </section>
    )
}