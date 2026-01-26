import React, { useContext, useState } from 'react';
import { AppContext } from '../AppProvider';

const PersonalisedPuzzleForm = ({ vwordInput }) => {
  const { setVword, setRefs, setAnswers } = useContext(AppContext);
  const [inputAnswers, setInputAnswers] = useState(Array(vwordInput.length).fill(''));
  const [inputRefs, setInputRefs] = useState(Array(vwordInput.length).fill(''));

  const generateCustomCrossword = () => {
    setVword(vwordInput);
    setRefs(inputRefs);
    setAnswers(inputAnswers);
    alert('🎉 Custom crossword generated successfully!');
  };

  return (
    <div className="space-y-3 mt-8">
      {vwordInput.split('').map((char, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg bg-gray-800/70 border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300">
          <input type="text"
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-gray-300 focus:outline-none focus:bg-gray-800 transition-all duration-300 placeholder-gray-400"
            placeholder={`Word containing '${char}' (answer #${i + 1})`}
            value={inputAnswers[i]}
            onChange={(e) => {
              const newAnswers = [...inputAnswers]; 
              newAnswers[i] = e.target.value; 
              setInputAnswers(newAnswers);
            }}
          />
          <input type="text"
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-gray-300 focus:outline-none focus:bg-gray-800 transition-all duration-300 placeholder-gray-400"
            placeholder={`Reference for word #${i + 1}`}
            value={inputRefs[i]}
            onChange={(e) => {
              const newRefs = [...inputRefs]; 
              newRefs[i] = e.target.value; 
              setInputRefs(newRefs);
            }}
          />
        </div>
      ))}
      <div className="flex justify-end pt-6">
        <button
          onClick={generateCustomCrossword}
          className="bg-gradient-to-r from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-900 font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-gray-300/60"
          data-i18n="generate_button"
        >
          🚀 Generate Crossword
        </button>
      </div>
    </div>
  );
};

const PersonalisedPuzzleContainer = () => {
    const { vword } = useContext(AppContext);
    const [vwordInput, setVwordInput] = useState(vword.toUpperCase());
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleGenerateForm = () => {
        if (vwordInput) setIsFormVisible(true);
        else alert('Please enter a vertical word to start.');
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700/40 hover:border-gray-500/50 transition-all duration-300 fade-in">
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-gray-50 to-gray-300 bg-clip-text text-transparent" data-i18n="personalized_puzzle_title">
                ✨ Create a Custom Puzzle
            </h2>
          <p className="text-center text-gray-200 mb-8 text-lg" data-i18n="personalized_puzzle_message">
                Enter a vertical word to begin creating your own crossword puzzle.
            </p>
            <div className="max-w-2xl mx-auto">
                <div className="flex gap-3 mb-8">
                    <input type="text"
                className="flex-grow bg-gray-800 border border-gray-600 text-white rounded-xl p-4 focus:ring-2 focus:ring-gray-300 focus:outline-none focus:bg-gray-800 transition-all duration-300 placeholder-gray-400 text-lg font-semibold"
                        placeholder="Vertical Word (e.g., FREUD)"
                        value={vwordInput}
                        onChange={(e) => setVwordInput(e.target.value.toUpperCase())}
                    />
                    <button
                        onClick={handleGenerateForm}
                className="bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 text-gray-900 font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-gray-300/60 whitespace-nowrap"
                        data-i18n="start_button"
                    >
                        ⚡ Start!
                    </button>
                </div>
            </div>
            {isFormVisible && <PersonalisedPuzzleForm key={vwordInput} vwordInput={vwordInput} />}
        </div>
    );
};

export default PersonalisedPuzzleContainer;