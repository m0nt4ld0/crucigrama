import React, { useContext, useEffect } from 'react'
import { updateContent, translation } from '../scripts/language-handler'
import { AppContext } from '../AppProvider'
import SettingsDropdown from './SettingsDropdown'


// Navbar component that provides language selection functionality and displays the brand logo.
const Navbar = () => {
    const { lang, setLang } = useContext(AppContext)

    // It updates the local storage and the content based on the selected language.
    useEffect(() => {
        localStorage.setItem('language', lang);
        updateContent(translation[lang]);
    }, [lang])

    // ADD settings and customization options here ***
    return (
        <header>
            <nav className="navbar bg-body-tertiary" id="mainNav">
                <div className="container-fluid"> 
                    <a className="navbar-brand"> 
                        <img src="/images/icons8-crossword-64.png" /> Crucigrama | Crossword Puzzle 
                    </a> 
                </div>
                <div className="container-fluid d-flex justify-content-between align-items-center">
    
                    {/* Left: Language Buttons */}
                    <div className="d-flex align-items-center">
                        <button className={`language-btn ${lang === 'es' ? 'active-btn' : ''}`}
                        onClick={() => setLang('es')}>Spanish
                        </button>
                        <button className={`language-btn ${lang === 'en' ? 'active-btn' : ''}`}
                        onClick={() => setLang('en')}>English
                        </button>
                    </div>

                    {/* Right: Settings Dropdown */}
                    <SettingsDropdown />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
