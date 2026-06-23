import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../AppProvider'
import { DrawCrossword } from './CrosswordContainer'
import { useReactToPrint } from 'react-to-print'
import { startTimerHandler, restartTimerHandler, formatTime } from '../scripts/timer-crossword'


// PuzzleFormContainer component renders the form and controls for the crossword puzzle.
// It includes buttons to restart the puzzle, view answers, print the puzzle, and control the timer.
const PuzzleFormContainer = ({ restartCrossword }) => {
    const { showAnswers, setShowAnswers, vword, timerDuration, timerRef, setTimerRef } = useContext(AppContext)
    const [timeLeft, setTimeLeft] = useState(0); // 5 minutes in seconds

    // It also uses the `useReactToPrint` hook to handle printing the crossword puzzle.
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef,
        documentTitle: `Crucigrama | ${vword}`,
        pageStyle: ``,
    });

    const handleViewAnswers = () => {
  // 1. Tell React to flip the switch and show the answers on the grid
  setShowAnswers(true);

  // 2. Clear the active timer interval so the clock stops ticking
  if (timerRef) {
        clearInterval(timerRef);
        setTimerRef(null);
    }
};

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
                <input data-i18n="restart_button" type="button" className="btn btn-primary" id="btn-restart" value="♻️ Restart" onClick={() => restartCrossword()} />
                <input data-i18n="view_answers_button" type="button" className="btn btn-primary" id="btn-showAnswers" value="🔎 Show Answers" onClick={handleViewAnswers} />
                <input data-i18n="print_button" type="button" className="btn btn-primary" id="btn-showAnswers" value="🖨️ Print" onClick={reactToPrintFn} />

                <div id="timer-container">
                    <span>Time Left: </span><span id="timer">
                        {formatTime(timeLeft)}
                    </span>
                </div>

                {/* Crossword puzzle container */}
                <div id="crossword-container">
                    {/* Your crossword will go here */}
                </div>

                {/* Buttons to control the timer */}
                {!timerRef && <button id="start-button" onClick={() => startTimerHandler(timerDuration, timerRef, setTimerRef, setTimeLeft)} className="btn btn-primary" type="button">
                    Start Timer
                </button>}
                {timerRef && <button id="restart-button" onClick={() => restartTimerHandler(timerDuration, timerRef, setTimerRef, setTimeLeft)} className="btn btn-primary">
                    Restart Timer
                </button>}

                <button data-i18n="configuration_button_text" type="button" className="btn btn-primary" id="btn-config"
                    data-bs-toggle="modal" data-bs-target="#configurationModal">
                    🔩 Settings
                </button>

            </form>
            <div style={{ display: 'none' }}>
                <DrawCrossword contentRef={contentRef} showAnswers={showAnswers} />
            </div>
        </>
    )
}

export default PuzzleFormContainer
