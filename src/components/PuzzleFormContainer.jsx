import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../AppProvider'
import { DrawCrossword } from './CrosswordContainer'
import { useReactToPrint } from 'react-to-print'
import { startTimerHandler, restartTimerHandler, formatTime } from '../scripts/timer-crossword'


// PuzzleFormContainer component renders the form and controls for the crossword puzzle.
// It includes buttons to restart the puzzle, view answers, print the puzzle, and control the timer.
const PuzzleFormContainer = ({ restartCrossword }) => {
    const { setShowAnswers, vword, timerDuration, timerRef, setTimerRef } = useContext(AppContext)
    const [timeLeft, setTimeLeft] = useState(0); // 5 minutes in seconds

    // It also uses the `useReactToPrint` hook to handle printing the crossword puzzle.
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef,
        documentTitle: `Crucigrama | ${vword}`,
        pageStyle: ``,
    });

    // Clears the timer interval when timeLeft reaches 0.
    useEffect(() => {
        if (timerRef && timeLeft == 0) {
            clearInterval(timerRef);
            setTimerRef(null);
            setTimeLeft(0);
        }
    }, [timeLeft])

    return (
        <>
            <form className="container-sm" id="cpuzzle-options">
                <input data-i18n="restart_button" type="button" className="btn btn-primary text-wrap w-auto" id="btn-restart" value="♻️ Restart" onClick={() => restartCrossword()} />

                <input data-i18n="view_answers_button" type="button" className="btn btn-primary text-wrap w-auto" id="btn-showAnswers" value="🔎 Show Answers" onClick={() => setShowAnswers(true)} />
                
                <input data-i18n="print_button" type="button" className="btn btn-primary text-wrap w-auto" id="btn-showAnswers" value="🖨️ Print" onClick={reactToPrintFn} />

                {/* Buttons to control the timer */}
                {!timerRef && <button data-i18n="start_timer_button" id="start_timer_button" onClick={() => startTimerHandler(timerDuration, timerRef, setTimerRef, setTimeLeft)} className="btn btn-primary text-wrap w-auto" type="button">
                    ⏱️ Start Timer
                </button>}
                {timerRef && <button data-i18n="restart-timer-button" id="restart-button" onClick={() => restartTimerHandler(timerDuration, timerRef, setTimerRef, setTimeLeft)} className="btn btn-primary text-wrap w-auto">
                    Restart Timer
                </button>}

                <div id="timer-container">
                    <span>Time Remaining: </span><span id="timer">
                        {formatTime(timeLeft)}
                    </span>
                </div>

                {/* Crossword puzzle container */}
                <div id="crossword-container">
                    {/* Your crossword will go here */}
                </div>

                

 

            </form>
            <div style={{ display: 'none' }}>
                <DrawCrossword contentRef={contentRef} showAnswers={false} />
            </div>
        </>
    )
}

export default PuzzleFormContainer
