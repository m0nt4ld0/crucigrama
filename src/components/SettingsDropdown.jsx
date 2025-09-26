import React, { useContext, useState, useRef } from 'react';
import { AppContext } from '../AppProvider';

// A dropdown menu to change color settings for the crossword app 
const SettingsDropdown = () => {
    const [open, setOpen] = useState(false);
    const { setColors, colors, original_colors } = useContext(AppContext);

    const toggleDropdown = () => setOpen(!open);

    //handle the dropdown selection
    const handleColorChange = (e) => {
        const { name, value } = e.target;
        setColors(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetColors = () => {
        setColors(original_colors.current);
    };

    return (
        <div className="position-relative settings-dropdown">
            <button className="personalize-btn" onClick={toggleDropdown}>Personalize</button>

            {open && (
                <div className="dropdown-menu show" style={{ right: 0, left: 'auto'}}>

                    <label className="dropdown-item d-flex justify-content-between align-items-center">Vertical Word       
                        <input type="color" name="--c" value={colors['--c']} onChange={handleColorChange} />
                    </label>

                    <label className="dropdown-item d-flex justify-content-between align-items-center">Cell Border
                        <input type ="color" name="--d" value={colors['--d']} onChange={handleColorChange} />
                    </label>

                    <label className="dropdown-item d-flex justify-content-between align-items-center">Empty Cell
                        <input type ="color" name="--e" value={colors['--e']} onChange={handleColorChange} />
                    </label>

                    <label className="dropdown-item d-flex justify-content-between align-items-center">Correct Answer/Hover
                        <input type ="color" name="--f" value={colors['--f']} onChange={handleColorChange} />
                    </label>

                    <button className="dropdown-item text-center mt-2" onClick={resetColors}>Reset Colors</button>
                </div>
            )}
        </div>
    );
};

export default SettingsDropdown