import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../AppProvider';
import CustomPuzzleUsingJSON from './CustomPuzzleUsingJSON';


// PersonalisedPuzzleContainer component allows users to generate a custom crossword puzzle by providing a vertical word and corresponding references and answers.
const PersonalisedPuzzleContainer = () => {
    const { vword } = useContext(AppContext)
    const [vwordInput, setVwordInput] = useState(vword.toUpperCase())
    const [currForm, setCurrForm] = useState()

    const [jsonForm, setJsonForm] = useState()
    const [showJsonText, setShowJsonText] = useState(false)

    // Function to handle the generation of the custom crossword form.
    // It generates a JSON form based on the vertical word input and sets the current form.
    function handleGenerateForm(placeholder_translation) {
        if (vwordInput) {
            // Generate JSON form
            let jsonData = {
                "vword": vwordInput.toUpperCase(),
                "refs": Array(vwordInput.length).fill(0).map((_, i) => `Referencia ${i + 1}`),
                "answers": Array(vwordInput.length).fill(0).map((_, i) => `Palabra ${i + 1}`)
            }
            setJsonForm(JSON.stringify(jsonData, null, 2));

            setCurrForm(<PersonalisedPuzzleForm key={vwordInput} {...{ vwordInput, setShowJsonText }} />);
        } else {
            alert('Something went wrong... Did you load the vertical word?');
            // To clean the form if trying to create one without a VWORD
            setCurrForm(undefined);
        }
    }

    return (
        <div className="text-white ml-2 p-3 flex flex-col">
            <h3 className='underline text-2xl font-medium ' data-i18n="personalized_puzzle_title">Crucigrama personalizado</h3>
            <p className='p-3' data-i18n="personalized_puzzle_message">
                A continuación, podés generar tu propio crucigrama, con las palabras
                que vos elijas. <br />
                Primero, ingresá cuál va a ser la palabra a mostrar de manera
                vertical:
            </p>

            {/* Form to create crossword */}
            <form className="container-sm" id="cpuzzle-custom">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control p-3"
                            placeholder="Palabra vertical (pista)"
                            value={vwordInput}
                            onChange={(e) => setVwordInput(e.target.value.toUpperCase())}
                            id="txt-vword"
                            aria-describedby="crosswordsGenBlock"
                        />
                        <small data-i18n="example_message" id="crosswordsGenBlock" className="form-text text-muted p-3">
                            En el crucigrama de ejemplo, la palabra vertical es "FREUD".
                        </small>
                    </div>
                    <div className="col mt-5">
                        <input data-i18n="start_button" type="button" className="form-control btn btn-primary p-2 w-35 " id="btn-loadGenForm"
                            value="🚀 Start!" onClick={handleGenerateForm} />
                    </div>
                </div>

                {currForm}
            </form>

            <br />

            {/* Form to create crossword with JSON */}
            <CustomPuzzleUsingJSON jsonForm={jsonForm} setJsonForm={setJsonForm} showJsonText={showJsonText} />
        </div>
    )
}


// PersonalisedPuzzleForm component renders the form for users to input references and answers for the custom crossword puzzle based on the provided vertical word.
const PersonalisedPuzzleForm = ({ vwordInput, setShowJsonText, generateCustomCrossword }) => {
    // Declaration of placeholder text with fallback text.
    let leftPlaceholderOne = "Word containing the letter";
    let leftPlaceholderTwo = "answer, word #";

    let rightPlaceholderOne = "Reference for word #";
    let rightPlaceholderTwo = "containing the letter";

    const { setVword, setRefs, setAnswers, vword, refs, answers } = useContext(AppContext)
    const [inputAnswers, setInputAnswers] = useState(Array(vwordInput.length).fill(''))
    const [inputRefs, setInputRefs] = useState(Array(vwordInput.length).fill(''))

    useEffect(() => {
        setInputAnswers(Array(vwordInput.length).fill(''));
        setInputRefs(Array(vwordInput.length).fill(''));
    }, [vwordInput]);

    // Function to generate the custom crossword by setting the vertical word, references, and answers.
    function generateCustomCrossword() {
        setVword(vwordInput);
        setRefs(inputRefs)
        setAnswers(inputAnswers)
    }

    // Handles the change event for answer input fields.
    const handleAnswerInputChange = (e, idx) => {
        const newAnswers = [...inputAnswers]
        newAnswers[idx] = e.target.value;
        setInputAnswers(newAnswers)
    }

    // Handles the change event for reference input fields.
    const handleRefInputChange = (e, idx) => {
        const newRefs = [...inputRefs]
        newRefs[idx] = e.target.value;
        setInputRefs(newRefs)
    }

    return (
        <div id="cpuzzle-generator-container">
            {vwordInput.split('').map((char, i) => {
                return (<div key={i} className="row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control text"
                            placeholder={`${leftPlaceholderOne} ${char} (${leftPlaceholderTwo}${i + 1}).`}
                            value={inputAnswers[i]}
                            onChange={(e) => handleAnswerInputChange(e, i)}
                            id="txt-hword-${i}" />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control text"
                            placeholder={`${rightPlaceholderOne}${i + 1} ${rightPlaceholderTwo} ${char}`}
                            value={inputRefs[i]}
                            onChange={(e) => handleRefInputChange(e, i)}
                            id="txt-refs-${i}" />
                    </div>
                </div>)
            })}

            <div className="row">
                <div className="col">
                    <input
                        data-i18n="json_mode_button"
                        type="button"
                        className="form-control btn btn-secondary"
                        id="btn-jsonForm"
                        value="I prefer to generate it by inserting a JSON"
                        onClick={() => setShowJsonText(true)} />
                </div>
                <div className="col">
                    <input
                        data-i18n="generate_button"
                        type="button"
                        className="form-control btn btn-primary"
                        id="btn-generateForm"
                        value="Ready! Generate crossword"
                        onClick={generateCustomCrossword} />
                </div>
            </div>
        </div>
    )
}


export default PersonalisedPuzzleContainer
