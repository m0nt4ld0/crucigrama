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
  const { refs, answers } = useContext(AppContext)

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      <div className="container-fluid" id="mainContainer">
        <div className="crossword-container d-flex flex-column">
          <div className="d-flex justify-content-center">
            <h2>Crossword Completion Progress</h2>
          </div>
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="progress" style={{ width: '60%' }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                aria-label="Animated striped example" style={{ width: '0%' }} aria-valuenow="21" aria-valuemin="0"
                aria-valuemax="35"></div>
            </div>
          </div>
        </div>


        <div className="m-2"></div>

        {/* Crossword */}
        <CrosswordContainer />


        <PuzzleFormContainer />

        <br />
        <div className="container-sm" id="references">
          <h3 data-i18n="references_title">Referencias</h3>

          <ul>
            {refs.map((s, i) => {
              return <li key={i}>{s}</li>
            })}
          </ul>
        </div>

        <br />
        {/* Personalized Crossword Container */}
        <PersonalisedPuzzleContainer />
      </div >

      {/* Footer */}
      < Footer />

      <ColorConfiguration />
    </>
  )
}

export default App
