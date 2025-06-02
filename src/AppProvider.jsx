import React, { createContext, useEffect, useRef, useState } from 'react';

export const AppContext = createContext();

// AppProvider component that provides context values to its children.
export const AppProvider = ({ children }) => {
    const puzzleJSON = {
        "vword": "Freud",
        "refs": [
            "Antigua teoría pseudocientífica, hoy sin validez, que afirmaba poder determinar rasgos del cáracter y de la personalidad basándose en la forma del cráneo y las facciones.",
            "Fuerza que durante el análisis «se defiende por todos los medios contra la curación y a toda costa quiere aferrarse a la enfermedad y el padecimiento»",
            "Complejo de...",
            "Fuente de estímulos en constante fluir, procedente de una excitación interna (a diferencia del estímulo que es externo) y está ligada a un objeto, el cual es transitorio. Su satisfacción es parcial.",
            "Proyección, introyección, identificación proyectiva, todos estos son mecanismos de..."
        ],
        "answers": [
            "frenologia",
            "resistencia",
            "edipo",
            "pulsion",
            "defensa"
        ]
    }


    // {boolean} showAnswers - State to show or hide answers.
    const [showAnswers, setShowAnswers] = useState(false);


    // {Array<string>} answers - Array of answers for the puzzle.
    const [answers, setAnswers] = useState(puzzleJSON["answers"]);

    // {string} vword - The vertical word for the puzzle.
    const [vword, setVword] = useState(puzzleJSON["vword"]);

    // {Array<string>} refs - Array of reference clues for the puzzle.
    const [refs, setRefs] = useState(puzzleJSON["refs"]);



    // {Object} original_colors - Ref object containing original color variables.
    const original_colors = useRef({
        '--c': '#3C096C',
        '--d': '#5A189A',
        '--e': '#7B2CBF',
        '--f': '#9D4EDD',
    });

    // {Object} colors - Object containing color variables.
    const [colors, setColors] = useState(original_colors.current);



    // {string} lang - The current language setting.
    // defaults to 'en' if not set in localStorage.
    const [lang, setLang] = useState(localStorage.getItem('language') || 'en');


    // {number} timerDuration - Duration of the puzzle timer in seconds.
    const timerDuration = 300; // 5 minutes (for puzzle timer)

    // {Object|null} timerRef - Reference to the timer object.
    const [timerRef, setTimerRef] = useState(null);



    // The AppContext.Provider component with provided values.
    return (
        <AppContext.Provider value={{ showAnswers, setShowAnswers, vword, setVword, refs, setRefs, answers, setAnswers, colors, setColors, original_colors, lang, setLang, timerDuration, timerRef, setTimerRef }}>
            {children}
        </AppContext.Provider>
    );
};