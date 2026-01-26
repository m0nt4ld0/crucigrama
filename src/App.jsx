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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black" style={colors}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        <GameContainer restartCrossword={restartCrossword} />
        <div className="my-16 border-t border-gray-700/40"></div>
        <PersonalisedPuzzleContainer />
      </main>
      <Footer />
      <ColorConfiguration />
    </div>
  );
}

export default App;