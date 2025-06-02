/*
* ========================================================================================
*  Name of archive: language-handler.js
*  Author: EStuart
*  Creation Date: 12/06/2024
*  Last modified: 12/10/2024
*  Version: v0.1
*
*  Description:
*  This module handles the translation of the main index page.
*  The language's are stored within the Translation dictionary which allows the user to add more languages as desired
*
*  Modification history:
*  - 30/05/2024: EStuart - Archive creation.
*
*  Code function was based off of this guide https://medium.com/@nohanabil/building-a-multilingual-static-website-a-step-by-step-guide-7af238cc8505
*  - Notable Change from orignal code is the usage of javascript dictionaries instead of JSON files.
*  - Using json created CORS errors. In preference of using this web app without the use of hosting servers I decided to make the translation dictionaries in javascript to avoid CORS erros
* ========================================================================================
*/

// Updates the content of the HTML document with the inputed language Data
export function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (element.tagName == "INPUT") {
            element.value = langData[key];
        } else if (element.tagName == "SMALL") {
            element.textContent = langData[key];
        } else {
            element.innerHTML = langData[key];
        };
    });
}


// Constant variable that stores all of the translations for multiple languages
export const translation = {
    en: {
        personalized_puzzle_title: 'Personalized Crossword Puzzle',
        personalized_puzzle_message: 'Next, you can generate your own crossword puzzle, with the words you choose. <br> First, enter which word will be displayed vertically:',
        configuration_button_text: '🔩 Settings',
        print_button: '🖨️ Print',
        view_answers_button: '🔎 View Answers',
        restart_button: '♻️ Restart',
        references_title: 'References',
        start_button: '🚀 Start!',
        generate_button: 'Ready! Generate crossword',
        json_mode_button: 'I prefer to generate it by inserting a JSON',
        example_message: 'In the example crossword puzzle, the vertical word is "FREUD".',
        load_json_button: '🚀 Load',
        config_modal_title: '🔩 Settings',
        config_vertical_setting: 'Vertical word:',
        config_border_setting: 'Cell border:',
        config_empty_cell_setting: 'Empty cells:',
        config_correct_cell_setting: 'Correct word/hover:',
        config_reset_settings: "🔄 Reset values",
        config_save_settings: "💽 Save changes",
        leftPlaceholderOne: "Word that contains the letter",
        leftPlaceholderTwo: "answer, word #",
        rightPlaceholderOne: "Reference to the word #",
        rightPlaceholderTwo: "which contains the letter",
    },

    es: {
        personalized_puzzle_title: 'Crucigrama personalizado',
        personalized_puzzle_message: 'A continuación, podés generar tu propio crucigrama, con las palabras que vos elijas. <br> Primero, ingresá cuál va a ser la palabra a mostrar de manera vertical:',
        configuration_button_text: '🔩 Configuración',
        print_button: '🖨️ Imprimir',
        view_answers_button: '🔎 Ver Respuestas',
        restart_button: '♻️ Reiniciar',
        references_title: 'Referencias',
        start_button: '🚀 ¡Vamos!',
        generate_button: '¡Listo! Generar crucigrama',
        json_mode_button: 'Prefiero generarlo insertando un JSON',
        example_message: 'En el crucigrama de ejemplo, la palabra vertical es "FREUD".',
        load_json_button: '🚀 Cargar',
        config_modal_title: '🔩 Configuración',
        config_vertical_setting: 'Palabra vertical:',
        config_border_setting: 'Borde de las celdas:',
        config_empty_cell_setting: 'Celdas vacías:',
        config_correct_cell_setting: 'Palabra correcta/hover:',
        config_reset_settings: "🔄 Reiniciar valores",
        config_save_settings: "💽 Guardar cambios",
        leftPlaceholderOne: "Palabra que contenga la letra",
        leftPlaceholderTwo: "respuesta, palabra #",
        rightPlaceholderOne: "Referencia pzara la palabra #",
        rightPlaceholderTwo: "que contiene la letra",
    },
}

// Function to return the place holder text for the generateFormLoadCustomCrossword() function.
export function getPlaceholderTranslation(language) {
    let placeHolderTranslation = [
        translation[language].leftPlaceholderOne,
        translation[language].leftPlaceholderTwo,
        translation[language].rightPlaceholderOne,
        translation[language].rightPlaceholderTwo
    ];
    return placeHolderTranslation;
}
