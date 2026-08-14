import { useContext } from 'react';
import { AppContext } from './AppProvider.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import GameContainer from './components/GameContainer.jsx';
import PersonalisedPuzzleContainer from './components/PersonalisedPuzzleContainer.jsx';
import ColorConfiguration from './components/ColorConfiguration.jsx';

function App() {
  const { setShowAnswers, colors } = useContext(AppContext);

  const restartCrossword = () => {
    setShowAnswers(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={colors}>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">

        {/* Welcome banner */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white shadow-xl">
          <h1 className="text-3xl font-bold mb-2">
            Crossword Puzzle Maker
          </h1>

          <p className="text-indigo-100">
            Create, customize, and enjoy your own crossword puzzles!
          </p>
        </div>

        <GameContainer restartCrossword={restartCrossword} />

        <div className="my-12 border-t border-gray-700"></div>

        <PersonalisedPuzzleContainer />
      </main>

      <Footer />
      <ColorConfiguration />
    </div>
  );
}

export default App;