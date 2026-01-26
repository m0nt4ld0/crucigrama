import React, { useContext } from 'react';
import { AppContext } from '../AppProvider';

const References = () => {
  const { refs } = useContext(AppContext);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700/40 hover:border-gray-500/50 transition-all duration-300 slide-in-left">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-50 to-gray-300 bg-clip-text text-transparent" data-i18n="references_title">
        📝 References
      </h3>
      <ol className="space-y-3">
        {refs.map((ref, i) => (
          <li 
            key={i} 
            className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/60 border border-gray-700/50 hover:border-gray-500/50 hover:bg-gray-800 transition-all duration-300"
          >
            <span className="text-gray-100 font-bold text-lg mt-0.5">{i + 1}.</span>
            <p className="text-gray-200 leading-relaxed">{ref}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default References;