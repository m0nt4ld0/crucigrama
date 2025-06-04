import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../AppProvider';
import { stopTimerHandler } from '../scripts/timer-crossword';

// DrawCrossword component renders the crossword puzzle form.
export const DrawCrossword = ({ contentRef, showAnswers, handleKeyDown, inputRefs }) => {
    const { vword, colors, answers, refs, timerRef, setTimerRef } = useContext(AppContext)
    const [inputAns, setInputAns] = useState(answers.map((rowWord) => Array(rowWord.length).fill('')))
    const [isCorrect, setIsCorrect] = useState(Array(answers.length).fill(false))

    // Finds the maximum initial position of the vertical word in the answers.
    const findMaxInit = () => {
        let init = 0;
        for (let i = 0; i < answers.length; i++) {
            init = Math.max(init, answers[i].toLowerCase().indexOf(vword[i].toLowerCase()));
        }
        return init;
    }

    let maxInitPosition = findMaxInit();

    // Handles the change event for the input elements.
    const handleInputChange = (e, i, j) => {
        const newValue = e.target.value.toUpperCase();
        const newAnswers = [...inputAns];
        newAnswers[i][j] = newValue;
        setInputAns(newAnswers);
        validateWord(i, answers[i], inputAns[i].join(''));
    };

    // Validates if the input word matches the correct answer.
    const validateWord = (i, word1, word2) => {
        const newIsCorrect = [...isCorrect]
        newIsCorrect[i] = (word1.toLowerCase() == word2.toLowerCase());
        setIsCorrect(newIsCorrect);
    }

    // To be executed when the crossword is completed.
    // Stops the timer and displays a congratulatory alert.
    useEffect(() => {
        if (isCorrect.every(value => value === true)) {
            stopTimerHandler(timerRef, setTimerRef);
            alert("Congrats! You finished the crossword.");
        }
    }, [isCorrect])


    // Initializes input answers based on vertical word and letters' position in each answer.
    useEffect(() => {
        // console.log(vword, answers, refs)
        const newInputAns = answers.map((rowWord, i) => {
            let charIndex = rowWord.toLowerCase().indexOf(vword[i].toLowerCase());
            let newRow = Array(rowWord.length).fill('');
            if (charIndex >= 0) {
                newRow[charIndex] = rowWord[charIndex].toUpperCase();
            }
            return newRow;
        })
        setInputAns(newInputAns);
    }, [answers, vword]);

    return (<form ref={contentRef} className='puzzle-form' style={{ gridTemplateRows: `repeat(${answers.length}, 1fr)` }}>
        {answers.map((rowWord, i) => {
            try {
                let charIndex = rowWord.toLowerCase().indexOf(vword[i].toLowerCase())

                // initial position where the words start to be written in the horizontal row
                let currInitPosition = maxInitPosition - charIndex;

                // rendering a row (i.e. a horizontal word)
                // j iterator for horizontal words
                return (
                    Array(rowWord.length).fill(0).map((_, j) => {
                        let correctValue = rowWord[j];
                        let defaultValue = inputAns[i]? inputAns[i][j] : '';

                        // input cell of the puzzle form grid (where letter is entered)
                        return (<input
                            key={`${i}-${j}`}
                            className={'puzzle-cell ' + (isCorrect[i] ? 'correct-answer' : '')}
                            style={{ gridRow: i + 1, gridColumn: currInitPosition + j + 1, ...colors }}
                            value={showAnswers || (j == charIndex) ? correctValue : defaultValue}
                            onChange={(e) => handleInputChange(e, i, j)}
                            disabled={j == charIndex}
                            maxLength={1}
                            ref={el => { inputRefs ? inputRefs.current[i][currInitPosition + j] = el : '' }}
                            onKeyDown={(e) => { handleKeyDown ? handleKeyDown(e, i, currInitPosition + j) : '' }}
                        />)
                    })
                )
            } catch (error) {
                console.error(`Error rendering row ${i}:`, error);
                return null; // Return null if there's an error in rendering the row
            }
        })}
    </form>)
}

// CrosswordContainer component renders the crossword puzzle container.
const CrosswordContainer = () => {
    const { showAnswers, vword, answers } = useContext(AppContext)
    const inputRefs = useRef(answers.map((_, i) => Array(36).fill(null)));

    // handles keyboard navigation within the crossword puzzle using arrow keys.
    const handleKeyDown = (e, i, j) => {
        if (e.key === 'ArrowUp' && inputRefs.current[i - 1] && inputRefs.current[i - 1][j]) {
            inputRefs.current[i - 1][j].focus();
        }
        else if (e.key === 'ArrowDown' && inputRefs.current[i + 1] && inputRefs.current[i + 1][j]) {
            inputRefs.current[i + 1][j].focus();
        }
        else if (e.key === 'ArrowLeft' && inputRefs.current[i][j - 1]) {
            inputRefs.current[i][j - 1].focus();
        }
        else if (e.key === 'ArrowRight' && inputRefs.current[i][j + 1]) {
            inputRefs.current[i][j + 1].focus();
        }
    };

    return (
        <div className="container-md actual" id="cpuzzle">
            <DrawCrossword showAnswers={showAnswers} handleKeyDown={handleKeyDown} inputRefs={inputRefs} />
        </div>
    )
}

export default CrosswordContainer
