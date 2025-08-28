import React, { useContext, useEffect } from 'react';
import { updateContent, translation } from '../scripts/language-handler';
import { AppContext } from '../AppProvider';

const Navbar = () => {
    const { lang, setLang } = useContext(AppContext);

    useEffect(() => {
        localStorage.setItem('language', lang);
        updateContent(translation[lang]);
    }, [lang]);

    return (
        <header className="game-header">
            <style jsx>{`
                /* General Header and Navbar Styles */
                .game-header {
                    width: 100%;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    background-color: #301934; /* Dark Purple Background */
                    border-bottom: 1px solid #4a2d52; /* A slightly lighter purple border for subtle definition */
                }

                /* Brand and Logo Styling (Left Side) */
                .navbar-brand-container {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .navbar-logo {
                    height: 32px;
                    width: auto;
                    filter: brightness(1.8) invert(1); /* Inverts the logo color to make it light */
                }

                .navbar-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #e0e0e0; /* A soft, light gray for high visibility */
                }

                /* Language Selection Buttons (Right Side) */
                .language-selection-container {
                    display: flex;
                    gap: 0.5rem;
                }

                .language-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #fff; /* Light text color for buttons */
                    background-color: transparent;
                    border: 1px solid #7a5286; /* Light purple border */
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                }

                .language-btn:hover {
                    background-color: #4a2d52; /* Lighter purple on hover */
                    color: #fff;
                }

                .language-btn.active-btn {
                    background-color: #8c52ff; /* A vibrant purple for the active button */
                    color: #fff;
                    border-color: #8c52ff;
                }

                .language-btn.active-btn:hover {
                    background-color: #6a3abf; /* A darker shade on hover for the active button */
                    border-color: #6a3abf;
                }

                /* Responsive design for smaller screens */
                @media (max-width: 768px) {
                    .navbar {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 1rem;
                    }

                    .language-selection-container {
                        margin-top: 1rem;
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
            <nav className="navbar">
                <div className="navbar-brand-container">
                    <img src="/images/icons8-crossword-64.png" alt="Crossword Logo" className="navbar-logo" />
                    <span className="navbar-title">Crucigrama | Crossword Puzzle</span>
                </div>
                <div className="language-selection-container">
                    <button 
                        className={`language-btn ${lang === 'es' ? 'active-btn' : ''}`} 
                        onClick={() => setLang('es')}
                    >
                        Spanish
                    </button>
                    <button 
                        className={`language-btn ${lang === 'en' ? 'active-btn' : ''}`} 
                        onClick={() => setLang('en')}
                    >
                        English
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;