import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../AppProvider";
import { useReactToPrint } from "react-to-print";
import {
  startTimerHandler,
  restartTimerHandler,
  formatTime,
} from "../scripts/timer-crossword.js";
import { DrawCrossword } from "./CrosswordContainer";

const PrintCrossword = () => {
  const { answers, vword } = useContext(AppContext);

  if (!answers || answers.length === 0 || !vword) {
    return <div>Loading...</div>;
  }

  const findMaxInit = () =>
    answers.reduce(
      (max, word, i) =>
        Math.max(max, word.toLowerCase().indexOf(vword[i].toLowerCase())),
      0,
    );
  const maxInitPosition = findMaxInit();

  return (
    <div
      className="puzzle-form"
      style={{
        display: "grid",
        gap: "4px",
        gridTemplateRows: `repeat(${answers.length}, 1fr)`,
      }}
    >
      {answers.map((rowWord, i) => {
        const charIndex = rowWord.toLowerCase().indexOf(vword[i].toLowerCase());
        const currInitPosition = maxInitPosition - charIndex;

        return Array(rowWord.length)
          .fill(0)
          .map((_, j) => (
            <div
              key={`${i}-${j}`}
              className="w-10 h-10 md:w-12 md:h-12 text-center uppercase font-bold text-lg rounded-md bg-gray-200 border border-gray-400 flex items-center justify-center text-black"
              style={{ gridRow: i + 1, gridColumn: currInitPosition + j + 1 }}
            >
              {rowWord[j].toUpperCase()}
            </div>
          ));
      })}
    </div>
  );
};

const Controls = ({ handleRestart }) => {
  const { setShowAnswers, vword, timerDuration, timerRef, setTimerRef } =
    useContext(AppContext);
  const [timeLeft, setTimeLeft] = useState(0);

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Crucigrama | ${vword}`,
  });

  useEffect(() => {
    if (timerRef && timeLeft === 0) {
      clearInterval(timerRef);
      setTimerRef(null);
    }
  }, [timeLeft, timerRef, setTimerRef]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-purple-300">Controls</h3>
        <div className="text-lg font-mono bg-gray-900 px-3 py-1 rounded">
          <span>Time: </span>
          <span id="timer">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {!timerRef ? (
          <button
            onClick={() =>
              startTimerHandler(
                timerDuration,
                timerRef,
                setTimerRef,
                setTimeLeft,
              )
            }
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Start Timer
          </button>
        ) : (
          <button
            onClick={() =>
              restartTimerHandler(
                timerDuration,
                timerRef,
                setTimerRef,
                setTimeLeft,
              )
            }
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Restart Timer
          </button>
        )}
        <button
          onClick={handleRestart}
          data-i18n="restart_button"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Restart Puzzle
        </button>
        <button
          onClick={() => setShowAnswers(true)}
          data-i18n="view_answers_button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          View Answers
        </button>
        <button
          onClick={handlePrint}
          data-i18n="print_button"
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Print
        </button>
      </div>

      <button
        data-i18n="configuration_button_text"
        type="button"
        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
        data-bs-toggle="modal"
        data-bs-target="#configurationModal"
      >
        Settings
      </button>

      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <PrintCrossword />
        </div>
      </div>
    </div>
  );
};

export default Controls;
