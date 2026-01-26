import React, { useState } from 'react';
import CrosswordContainer from './CrosswordContainer';
import SidePanel from './SidePanel';

const GameContainer = ({ restartCrossword }) => {
  const [crosswordKey, setCrosswordKey] = useState(0);

  const handleRestart = () => {
    restartCrossword();
    setCrosswordKey(prevKey => prevKey + 1);
  };

  return (
    <div className="fade-in">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-gray-50 via-gray-300 to-gray-50 bg-clip-text text-transparent">
          ✨ Play the Puzzle
        </h1>
        <p className="text-gray-200 text-lg max-w-2xl mx-auto">
          Fill in the words based on the references below. Challenge yourself and complete the crossword!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 slide-in-right">
        <div className="lg:col-span-2 flex justify-center items-start">
          <div className="scale-in">
            <CrosswordContainer key={crosswordKey} />
          </div>
        </div>
        <div className="lg:col-span-1 slide-in-left">
          <SidePanel handleRestart={handleRestart} />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;