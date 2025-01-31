import React, { useContext, useEffect } from 'react'
import { updateContent, translation } from '../scripts/language-handler'
import { AppContext } from '../AppProvider'


// Navbar component that provides language selection functionality and displays the brand logo.
const Navbar = () => {
    const { lang, setLang } = useContext(AppContext)

    // It updates the local storage and the content based on the selected language.
    useEffect(() => {
        localStorage.setItem('language', lang);
        updateContent(translation[lang]);
    }, [lang])

    return (
        <header>
            <nav className="navbar bg-body-tertiary" id="mainNav">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <img src="/images/icons8-crossword-64.png" />
                        Crucigrama | Crossword Puzzle
                    </a>
                    <div className="langauge-selection">
                        <button className={"language-btn " +(lang=='es'? "active-btn" : '')} onClick={() => setLang('es')}>
                            Spanish
                        </button>
                        <button className={"language-btn " + (lang=='en'? "active-btn" : '')} onClick={() => setLang('en')}>
                            English
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
