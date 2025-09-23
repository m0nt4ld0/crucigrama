import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppProvider';
import CustomPuzzleUsingJSON from './CustomPuzzleUsingJSON';

// PersonalisedPuzzleContainer component
const PersonalisedPuzzleContainer = () => {
    const { vword } = useContext(AppContext);
    const [vwordInput, setVwordInput] = useState(vword.toUpperCase());
    const [currForm, setCurrForm] = useState();

    const [jsonForm, setJsonForm] = useState();
    const [showJsonText, setShowJsonText] = useState(false);

    // Function to generate form
    function handleGenerateForm() {
        if (vwordInput) {
            const jsonData = {
                vword: vwordInput.toUpperCase(),
                refs: Array(vwordInput.length).fill(0).map((_, i) => `Referencia ${i + 1}`),
                answers: Array(vwordInput.length).fill(0).map((_, i) => `Palabra ${i + 1}`)
            };
            setJsonForm(JSON.stringify(jsonData, null, 2));
            setCurrForm(<PersonalisedPuzzleForm key={vwordInput} {...{ vwordInput, setShowJsonText }} />);
        } else {
            alert('Algo salió mal... ¿Cargaste la palabra vertical?');
            setCurrForm(undefined);
        }
    }

    return (
        <div className="container-sm">
            <h3 data-i18n="personalized_puzzle_title">Crucigrama personalizado</h3>
            <p data-i18n="personalized_puzzle_message">
                A continuación, podés generar tu propio crucigrama, con las palabras
                que vos elijas. <br />
                Primero, ingresá cuál va a ser la palabra a mostrar de manera vertical:
            </p>

            {/* Formulario para ingresar palabra vertical */}
            <form className="container-sm" id="cpuzzle-custom">
                <div className="row mb-1 align-items-start">
                    <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Palabra vertical (pista)"
                        value={vwordInput}
                        onChange={(e) => setVwordInput(e.target.value.toUpperCase())}
                        id="txt-vword"
                        aria-describedby="crosswordsGenBlock"
                    />
                    </div>
                    <div className="col-auto">
                    <input
                        data-i18n="start_button"
                        type="button"
                        className="btn btn-primary"
                        id="btn-loadGenForm"
                        value="🚀 Start!"
                        onClick={handleGenerateForm}
                    />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                    <small
                        data-i18n="example_message"
                        id="crosswordsGenBlock"
                        className="form-text text-muted"
                    >
                        En el crucigrama de ejemplo, la palabra vertical es "FREUD".
                    </small>
                    </div>
                </div>

                {currForm}
                </form>

            <br />

            {/* JSON text area para editar manualmente */}
            <CustomPuzzleUsingJSON
                jsonForm={jsonForm}
                setJsonForm={setJsonForm}
                showJsonText={showJsonText}
            />
        </div>
    );
};

// Formulario de entradas por letra
const PersonalisedPuzzleForm = ({ vwordInput, setShowJsonText }) => {
    const { setVword, setRefs, setAnswers } = useContext(AppContext);
    const [inputAnswers, setInputAnswers] = useState(Array(vwordInput.length).fill(''));
    const [inputRefs, setInputRefs] = useState(Array(vwordInput.length).fill(''));

    useEffect(() => {
        setInputAnswers(Array(vwordInput.length).fill(''));
        setInputRefs(Array(vwordInput.length).fill(''));
    }, [vwordInput]);

    const handleAnswerInputChange = (e, idx) => {
        const newAnswers = [...inputAnswers];
        newAnswers[idx] = e.target.value;
        setInputAnswers(newAnswers);
    };

    const handleRefInputChange = (e, idx) => {
        const newRefs = [...inputRefs];
        newRefs[idx] = e.target.value;
        setInputRefs(newRefs);
    };

    const generateCustomCrossword = () => {
        setVword(vwordInput);
        setRefs(inputRefs);
        setAnswers(inputAnswers);
    };

    return (
        <div id="cpuzzle-generator-container" className="mt-4">
            <div className="container">
                {vwordInput.split('').map((char, i) => (
                    <div key={i} className="row mb-3 align-items-center">
                        {/* Letra individual (opcional para mostrar la letra) */}
                        <div className="col-1 text-center fw-bold">
                            {char}
                        </div>

                        {/* Palabra que contiene la letra */}
                        <div className="col-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Palabra que contiene "${char}"`}
                                value={inputAnswers[i]}
                                onChange={(e) => handleAnswerInputChange(e, i)}
                                id={`txt-hword-${i}`}
                            />
                        </div>

                        {/* Pista de la palabra */}
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Pista para la palabra que contiene "${char}"`}
                                value={inputRefs[i]}
                                onChange={(e) => handleRefInputChange(e, i)}
                                id={`txt-refs-${i}`}
                            />
                        </div>
                    </div>
                ))}

                {/* Botones de acción */}
                <div className="row mt-4">
                    <div className="col">
                        <input
                            data-i18n="json_mode_button"
                            type="button"
                            className="form-control btn btn-secondary"
                            id="btn-jsonForm"
                            value="Prefiero generarlo con JSON"
                            onClick={() => setShowJsonText(true)}
                        />
                    </div>
                    <div className="col">
                        <input
                            data-i18n="generate_button"
                            type="button"
                            className="form-control btn btn-primary"
                            id="btn-generateForm"
                            value="¡Listo! Generar crucigrama"
                            onClick={generateCustomCrossword}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalisedPuzzleContainer;
