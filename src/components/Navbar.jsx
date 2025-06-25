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
            <nav className="bg-slate-900 text-white  flex w-full" >
                <div className='flex justify-between w-full'>
                    <div className='flex gap-4'>
                        <a >
                            <img src="/images/icons8-crossword-64.png" className='p-2 bg-white'/>
                        </a>
                        <p className='py-5 px-2 font-bold text-3xl'>Crucigrama | Crossword Puzzle</p>
                    </div>
                    <div className="p-4 mr-10">
                        
                        <button className={"language-btn " + (lang == 'es' ? "active-btn" : '')} onClick={() => setLang('es')} >
                            🇪🇸Spanish
                        </button>
                        <button className={"language-btn " + (lang == 'en' ? "active-btn" : '')} onClick={() => setLang('en')}>
                            🏴󠁧󠁢󠁥󠁮󠁧󠁿English
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
