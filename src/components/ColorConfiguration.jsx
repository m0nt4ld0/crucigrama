import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../AppProvider';

const ColorConfiguration = () => {
  const { colors, setColors, original_colors } = useContext(AppContext);

  const [initialModalColors, setInitialModalColors] = useState(null);

  useEffect(() => {
    const modalElement = document.getElementById('configurationModal');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && modalElement.classList.contains('show')) {
          setInitialModalColors(colors);
        }
      });
    });

    if (modalElement) {
      observer.observe(modalElement, { attributes: true });
    }

    return () => observer.disconnect();
  }, [colors]);

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setColors(prevColors => ({ ...prevColors, [name]: value }));
  };

  const handleCancel = () => {
    if (initialModalColors) {
      setColors(initialModalColors);
    }
  };

  const handleResetToDefaults = () => {
    setColors(original_colors.current);
  };

  const ColorSettingRow = ({ labelKey, colorKey, value }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/70 border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 group">
      <div className="flex-1">
        <label data-i18n={labelKey} className="font-semibold text-gray-200 group-hover:text-white transition-colors block mb-1">
          {labelKey.replace(/_/g, ' ')}
        </label>
        <code className="block text-xs text-gray-500 uppercase font-mono">{value}</code>
      </div>
      <div 
        className="relative w-20 h-12 rounded-lg border-2 border-gray-500/60 overflow-hidden shadow-lg ml-4 hover:border-gray-400 transition-all duration-300 group-hover:scale-110" 
        style={{ backgroundColor: value }}
      >
        <input
          type="color"
          name={colorKey}
          value={value}
          onChange={handleColorChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <div className="modal fade" id="configurationModal" tabIndex="-1" data-bs-backdrop="static" aria-labelledby="configModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-200 border border-gray-700/40 shadow-2xl rounded-2xl">
          <div className="modal-header border-b border-gray-700/40 p-6 flex justify-between items-center">
            <h1 data-i18n="config_modal_title" className="modal-title text-2xl font-bold bg-gradient-to-r from-gray-50 to-gray-300 bg-clip-text text-transparent flex items-center gap-3" id="configModalLabel">
              <span className="text-3xl">🎨</span>
              Theme Settings
            </h1>
            <button type="button" className="text-gray-400 hover:text-white transition-colors" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="modal-body p-6 space-y-4">
            <p className="text-gray-400 text-sm mb-6">Customize your puzzle theme colors. Changes apply instantly!</p>
            <ColorSettingRow labelKey="config_vertical_setting" colorKey="--c" value={colors['--c']} />
            <ColorSettingRow labelKey="config_border_setting" colorKey="--d" value={colors['--d']} />
            <ColorSettingRow labelKey="config_empty_cell_setting" colorKey="--e" value={colors['--e']} />
            <ColorSettingRow labelKey="config_correct_cell_setting" colorKey="--f" value={colors['--f']} />
          </div>
          <div className="modal-footer flex justify-between items-center border-t border-gray-700/40 p-6 gap-3">
            <button 
              data-i18n="config_reset_settings" 
              type="button" 
              onClick={handleResetToDefaults}
              className="px-6 py-2 bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 text-gray-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg hover:shadow-gray-300/60"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12A8 8 0 1013.44 5.23" /></svg>
              Reset
            </button>
            <div className="space-x-3">
              <button 
                type="button" 
                data-bs-dismiss="modal" 
                onClick={handleCancel}
                className="px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-100 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
              <button 
                type="button" 
                data-bs-dismiss="modal"
                className="px-6 py-2 bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 text-gray-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-gray-300/60"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorConfiguration;