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
            <form className="container-sm p-3" id="cpuzzle-options">
                <input data-i18n="restart_button" type="button" className="btn btn-primary p-2" id="btn-restart" value="♻️ Restart" onClick={() => restartCrossword()} />
                <input data-i18n="view_answers_button" type="button" className="btn btn-primary p-2" id="btn-showAnswers" value="🔎 Show Answers" onClick={() => setShowAnswers(true)} />
                <input data-i18n="print_button " type="button" className="btn btn-primary p-2" id="btn-showAnswers" value="🖨️ Print" onClick={reactToPrintFn} />

                <div className='text-white ml-5 m-3' id="timer-container">
                    <span>Time Left: </span><span id="timer">
                        {formatTime(timeLeft)}
                    </span>
                </div>

                {/* Crossword puzzle container */}
                <div id="crossword-container">
                    {/* Your crossword will go here */}
                </div>

                {/* Buttons to control the timer */}
                {!timerRef && <button id="start-button" onClick={() => startTimerHandler(timerDuration, timerRef, setTimerRef, setTimeLeft)} className="btn btn-primary p-2" type="button">
                    Start Timer
                </button>}
                {timerRef && <button id="restart-button" onClick={() => restartTimerHandler(timerDuration, timerRef, setTimerRef, setTimeLeft)} className="btn btn-primary p-2 ">
                    Restart Timer
                </button>}

                <button data-i18n="configuration_button_text" type="button" className="btn btn-primary p-2" id="btn-config"
                    data-bs-toggle="modal" data-bs-target="#configurationModal">
                    🔩 Settings
                </button>

            </form>
            <div style={{ display: 'none' }}>
                <DrawCrossword contentRef={contentRef} showAnswers={false} />
            </div>
        </>
    )
}

export default PuzzleFormContainer
