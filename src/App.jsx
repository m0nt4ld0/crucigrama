import { useContext, useEffect, useState } from 'react'
import './styles/main.css'

import Navbar from './components/Navbar.jsx'
import PuzzleFormContainer from './components/PuzzleFormContainer.jsx'
import PersonalisedPuzzleContainer from './components/PersonalisedPuzzleContainer.jsx'
import Footer from './components/Footer.jsx'
import CrosswordContainer from './components/CrosswordContainer.jsx'
import ColorConfiguration from './components/ColorConfiguration.jsx'
import { AppContext } from './AppProvider.jsx'


// Main App component that renders the entire application.
// It includes the Navbar, main container with crossword progress, crossword puzzle, puzzle form, references, personalized puzzle container, footer, and color configuration.
function App() {
  const { refs, answers, setShowAnswers } = useContext(AppContext)
  const [crossword, setCrossword] = useState(0) // State to restart the crossword puzzle

  const restartCrossword = () => {
    setShowAnswers(false) // Hide answers when restarting
    setCrossword(crossword + 1) // Increment to trigger a re-render
  }

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      <div className="min-h-screen overflow-scroll bg-gradient-to-b from-slate-800 to-slate-800"

 >
        <div className='flex flex-col'>
          <div className='pt-5 m-5'>
            <h2 className='text-3xl underline underline-offset-2 font-medium text-white '>Crossword Completion Progress</h2>
          </div>
          <div className='flex gap-3' >
            <div  className='text-white'>
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                aria-label="Animated striped example" style={{ width: '0%' }} aria-valuenow="21" aria-valuemin="0"
                aria-valuemax="35"></div>
            </div>
          </div>
        </div>


        <div className="m-2"></div>

        {/* Crossword */}
        <CrosswordContainer key={crossword} />

        <PuzzleFormContainer restartCrossword={restartCrossword} />

        <br />
        <div className="text-white ml-2 p-3" id="references">
          <h3 className='underline text-2xl font-medium ' data-i18n="references_title">Referencias</h3>

          <ul className='p-3'>
            {refs.map((s, i) => {
              return <li key={i}>{s}</li>
            })}
          </ul>
        </div>

        <br />
        {/* Personalized Crossword Container */}
        <PersonalisedPuzzleContainer />


        {/* Footer */}
      < Footer />

      <ColorConfiguration />
      </div >

      
    </>
  )
}

export default App
