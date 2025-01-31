import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppProvider'


// ustomPuzzleUsingJSON component allows users to load a crossword puzzle from a JSON string.
const CustomPuzzleUsingJSON = ({ jsonForm, setJsonForm, showJsonText }) => {
    const { setVword, setRefs, setAnswers } = useContext(AppContext)
    
    // Parses the JSON string and updates the context with the crossword puzzle data.
    async function loadFromJSON() {
        let jsonData = await JSON.parse(jsonForm);
        setVword(jsonData['vword']);
        setRefs(jsonData['refs']);
        setAnswers(jsonData['answers']);
        alert('¡Listo!');
    }

    return (
        <div className="container-sm" id="crossword-code" style={{ display: showJsonText ? 'block' : 'none' }}>
            <form className="container-sm" id="cpuzzle-code">
                <textarea className="form-control" rows="10" id="jsonpuzzle" value={jsonForm} onChange={(e) => setJsonForm(e.target.value)} >
                </textarea>
                <input data-i18n="load_json_button" type="button" className="btn btn-primary" id="btn-restart" value="🚀 Cargar"
                    onClick={loadFromJSON} />
            </form>
        </div>
    )
}

export default CustomPuzzleUsingJSON
