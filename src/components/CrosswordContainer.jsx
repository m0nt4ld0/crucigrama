import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../AppProvider';
import { stopTimerHandler } from '../scripts/timer-crossword';

// Exported for printing
export const DrawCrossword = ({ showAnswers: showAnswersProp, handleKeyDown, inputRefs }) => {
  const { vword, answers, timerRef, setTimerRef, showAnswers: showAnswersCtx } = useContext(AppContext);
  // If an explicit prop is passed (e.g. false for the print copy), use it; otherwise use context
  const showAnswers = showAnswersProp !== undefined ? showAnswersProp : showAnswersCtx;

  if (!answers || answers.length === 0 || !vword) {
    return <div className="p-4">Loading puzzle...</div>;
  }

  const [inputAns, setInputAns] = useState(() => answers.map(row => Array(row.length).fill('')));
  const [isCorrect, setIsCorrect] = useState(() => Array(answers.length).fill(false));

  const findMaxInit = () => answers.reduce((max, word, i) => Math.max(max, word.toLowerCase().indexOf(vword[i].toLowerCase())), 0);
  const maxInitPosition = findMaxInit();

  const handleInputChange = (e, rowIdx, cellIdx) => {
    const newValue = e.target.value.toUpperCase();
    if (newValue.length > 1) return; // Prevent pasting multiple characters

    const newAnswers = [...inputAns];
    newAnswers[rowIdx][cellIdx] = newValue;
    setInputAns(newAnswers);
    validateWord(rowIdx, newAnswers[rowIdx].join(''), answers[rowIdx]);

    // NEW: Auto-advance to the next cell in the word
    if (newValue && inputRefs.current) {
        const rowWord = answers[rowIdx];
        const charIndex = rowWord.toLowerCase().indexOf(vword[rowIdx].toLowerCase());
        const currInitPosition = maxInitPosition - charIndex;
        const currentGridCol = currInitPosition + cellIdx;

        const nextInput = inputRefs.current[rowIdx][currentGridCol + 1];

        if (nextInput && !nextInput.disabled) {
            nextInput.focus();
        }
    }
  };

  const validateWord = (i, word1, word2) => {
    const newIsCorrect = [...isCorrect];
    newIsCorrect[i] = word1.toLowerCase() === word2.toLowerCase();
    setIsCorrect(newIsCorrect);
  };

  useEffect(() => {
    if (isCorrect.every(value => value === true)) {
      stopTimerHandler(timerRef, setTimerRef);
      alert("Congrats! You finished the crossword.");
    }
  }, [isCorrect, timerRef, setTimerRef]);

  // Stop the timer when answers are revealed
  useEffect(() => {
    if (showAnswers) {
      stopTimerHandler(timerRef, setTimerRef);
    }
  }, [showAnswers]);
  
  useEffect(() => {
    setIsCorrect(Array(answers.length).fill(false));
    const newInputAns = answers.map((rowWord, i) => {
        let charIndex = rowWord.toLowerCase().indexOf(vword[i].toLowerCase());
        let newRow = Array(rowWord.length).fill('');
        if (charIndex >= 0) newRow[charIndex] = rowWord[charIndex].toUpperCase();
        return newRow;
    });
    setInputAns(newInputAns);
  }, [answers, vword]);

  return (
    <div className='puzzle-form' style={{ display: 'grid', gap: '4px', gridTemplateRows: `repeat(${answers.length}, 1fr)` }}>
      {answers.map((rowWord, i) => {
        try {
          const charIndex = rowWord.toLowerCase().indexOf(vword[i].toLowerCase());
          const currInitPosition = maxInitPosition - charIndex;

          return Array(rowWord.length).fill(0).map((_, j) => {
            const isDisabled = j === charIndex;
            const isWordCorrect = isCorrect[i];

            // UPDATED: Classes now use CSS variables from the color context
            const baseClasses = "w-10 h-10 md:w-12 md:h-12 text-center uppercase font-bold text-lg rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white";
            const enabledClasses = "bg-[var(--e)] border border-[var(--d)] hover:bg-[var(--f)]";
            const disabledClasses = "bg-[var(--c)] border-[var(--d)] cursor-not-allowed";
            const correctClasses = "bg-[var(--f)] border-[var(--d)]";
            
            const cellClasses = `${baseClasses} ${isDisabled ? disabledClasses : isWordCorrect ? correctClasses : enabledClasses}`;

            return (
              <input
                key={`${i}-${j}`}
                className={cellClasses}
                style={{ gridRow: i + 1, gridColumn: currInitPosition + j + 1 }}
                value={showAnswers || isDisabled ? rowWord[j].toUpperCase() : (inputAns[i]?.[j] || '')}
                onChange={(e) => handleInputChange(e, i, j)}
                disabled={isDisabled}
                maxLength={1}
                ref={el => { if (inputRefs) inputRefs.current[i][currInitPosition + j] = el; }}
                onKeyDown={(e) => { if (handleKeyDown) handleKeyDown(e, i, currInitPosition + j); }}
              />
            );
          });
        } catch (error) {
          console.error(`Error rendering row ${i}:`, error);
          return null;
        }
      })}
    </div>
  );
};

const CrosswordContainer = () => {
  const { answers, showAnswers } = useContext(AppContext);
  const maxWordLength = answers.reduce((max, word) => Math.max(max, word.length), 0);
  const inputRefs = useRef(answers.map(() => Array(maxWordLength).fill(null)));

  const handleKeyDown = (e, i, j) => {
    const key = e.key;
    let nextFocus = null;

    if (key === 'ArrowUp' && i > 0) nextFocus = inputRefs.current[i - 1][j];
    else if (key === 'ArrowDown' && i < answers.length - 1) nextFocus = inputRefs.current[i + 1][j];
    else if (key === 'ArrowLeft' && j > 0) nextFocus = inputRefs.current[i][j - 1];
    else if (key === 'ArrowRight') nextFocus = inputRefs.current[i][j + 1];

    if (nextFocus && !nextFocus.disabled) {
      e.preventDefault();
      nextFocus.focus();
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg inline-block">
      <DrawCrossword showAnswers={showAnswers} handleKeyDown={handleKeyDown} inputRefs={inputRefs} />
    </div>
  );
};

export default CrosswordContainer;