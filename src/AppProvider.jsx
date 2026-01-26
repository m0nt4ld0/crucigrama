import React, { createContext, useRef, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const puzzleJSON = {
    vword: "Freud",
    refs: [
      "Antigua teoría pseudocientífica, hoy sin validez, que afirmaba poder determinar rasgos del cáracter y de la personalidad basándose en la forma del cráneo y las facciones.",
      "Fuerza que durante el análisis «se defiende por todos los medios contra la curación y a toda costa quiere aferrarse a la enfermedad y el padecimiento»",
      "Complejo de...",
      "Fuente de estímulos en constante fluir, procedente de una excitación interna (a diferencia del estímulo que es externo) y está ligada a un objeto, el cual es transitorio. Su satisfacción es parcial.",
      "Proyección, introyección, identificación proyectiva, todos estos son mecanismos de..."
    ],
    answers: [
      "frenologia",
      "resistencia",
      "edipo",
      "pulsion",
      "defensa"
    ]
  };

  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState(puzzleJSON.answers);
  const [vword, setVword] = useState(puzzleJSON.vword);
  const [refs, setRefs] = useState(puzzleJSON.refs);

  const original_colors = useRef({
    '--c': '#111111',
    '--d': '#1f1f1f',
    '--e': '#2f2f2f',
    '--f': '#3f3f3f',
  });

  const [colors, setColors] = useState(original_colors.current);
  const [lang, setLang] = useState(localStorage.getItem('language') || 'en');
  const timerDuration = 300; // 5 minutes
  const [timerRef, setTimerRef] = useState(null);

  const value = {
    showAnswers, setShowAnswers,
    vword, setVword,
    refs, setRefs,
    answers, setAnswers,
    colors, setColors, original_colors,
    lang, setLang,
    timerDuration, timerRef, setTimerRef
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};