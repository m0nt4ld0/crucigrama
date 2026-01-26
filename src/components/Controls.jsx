import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../AppProvider';
import { useReactToPrint } from 'react-to-print';
import { startTimerHandler, restartTimerHandler, formatTime } from '../scripts/timer-crossword.js';
import { DrawCrossword } from './CrosswordContainer';

const Controls = ({ handleRestart }) => {
  const { setShowAnswers, vword, timerDuration, timerRef, setTimerRef } = useContext(AppContext);
  const [timeLeft, setTimeLeft] = useState(0);

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Crucigrama | ${vword}`,
  });

  useEffect(() => {
    if (timerRef && timeLeft === 0) {
      clearInterval(timerRef);
      setTimerRef(null);
    }
  }, [timeLeft, timerRef, setTimerRef]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700/40 hover:border-gray-500/50 transition-all duration-300 slide-in-left">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-100 mb-4">⚙️ Controls</h3>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-xl border border-gray-700/50 mb-6">
          <p className="text-sm text-gray-300 mb-2">⏱️ Time Left</p>
          <p className="text-4xl font-bold text-gray-100 font-mono">
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-4">
        {!timerRef ? (
          <button 
            onClick={() => startTimerHandler(timerDuration, timerRef, setTimerRef, setTimeLeft)} 
            className="w-full bg-gradient-to-r from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-900 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-gray-300/60 transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            ▶️ Start Timer
          </button>
        ) : (
          <button 
            onClick={() => restartTimerHandler(timerDuration, timerRef, setTimerRef, setTimeLeft)} 
            className="w-full bg-gradient-to-r from-gray-300 to-gray-500 hover:from-gray-400 hover:to-gray-600 text-gray-900 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-gray-400/60 transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            🔄 Restart Timer
          </button>
        )}
        
        <button 
          onClick={handleRestart} 
          data-i18n="restart_button" 
          className="w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-gray-100 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-gray-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300"
        >
          🔁 Restart Puzzle
        </button>
        
        <button 
          onClick={() => setShowAnswers(true)} 
          data-i18n="view_answers_button" 
          className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-100 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-gray-600/50 transform hover:scale-105 active:scale-95 transition-all duration-300"
        >
          👁️ View Answers
        </button>
        
        <button 
          onClick={handlePrint} 
          data-i18n="print_button" 
          className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-100 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-gray-700/50 transform hover:scale-105 active:scale-95 transition-all duration-300"
        >
          🖨️ Print
        </button>
      </div>

      <button
        data-i18n="configuration_button_text"
        type="button"
        className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-100 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-gray-700/50 hover:border-gray-500/50"
        data-bs-toggle="modal"
        data-bs-target="#configurationModal">
        ⚡ Settings
      </button>

      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <DrawCrossword showAnswers={false} />
        </div>
      </div>
    </div>
  );
};

export default Controls;