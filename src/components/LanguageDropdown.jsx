import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../AppProvider';
import { updateContent, translation } from '../scripts/language-handler';

// A dropdown menu to change color settings for the crossword app 
const LanguageDropdown = () => {
    const [open, setOpen] = useState(false);
    const { lang, setLang } = useContext(AppContext);

    const toggleDropdown = () => setOpen(!open);

    //handle the dropdown selection
    const handleLanguageChange = (e) => {
        setLang(e);
        setOpen(false);
    };

    // It updates the local storage and the content based on the selected language.
    useEffect(() => {
        localStorage.setItem('language', lang);
        updateContent(translation[lang]);
    }, [lang])

    return (
        <div className="position-relative settings-dropdown">
            <button className="personalize-btn" 
            onClick={toggleDropdown}>Language
            </button>

            {open && (
                <div className="dropdown-menu show" style={{ right: '0', left: '0'}}>

                    <button className="dropdown-item d-flex align-items-center" onClick={() => handleLanguageChange('es')}>
                        <img src="https://flagcdn.com/es.svg"
                        alt="Spain flag" width="24" height="16"
                        style={{ marginRight: '8px' }}/>
                        Spanish
                    </button>

                    <button className="dropdown-item d-flex align-items-center" onClick={ () => handleLanguageChange('en')}>
                        <img src="https://flagcdn.com/gb.svg"
                        alt="UK flag" width="24" height="16"
                        style={{ marginRight: '8px' }}/>
                        English
                    </button>
                </div>
            )}
        </div>
    );
};

export default LanguageDropdown