/*
* ========================================================================================
*  Name of archive: language-handler.js
*  Author: EStuart
*  Creation Date: 12/06/2024
*  Last modified: 27/03/2025
*  Version: v0.2
*
*  Description:
*  This module handles the translation of the main index page.
*  The language's are stored within the Translation dictionary which allows the user to add more languages as desired
*
*  Modification history:
*  - 30/05/2024: EStuart - Archive creation.
*  - 27/03/2025: Artemii Fridriksen
*
*  Code function was based off of this guide https://medium.com/@nohanabil/building-a-multilingual-static-website-a-step-by-step-guide-7af238cc8505
*  - Notable Change from orignal code is the usage of javascript dictionaries instead of JSON files.
*  - Using json created CORS errors. In preference of using this web app without the use of hosting servers I decided to make the translation dictionaries in javascript to avoid CORS erros
* ========================================================================================
*/
let translation = {};

// Load translations from JSON files
async function loadTranslations() {
    try {
        const lang = localStorage.getItem('language') || 'en';
        const response = await fetch(`locales/${lang}.json`);
        translation[lang] = await response.json();
        updateContent(translation[lang]);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Updates the content of the HTML document with the inputed language Data
// Updates the content of the HTML document with the inputed language Data
function updateContent(langData) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (element.tagName == "INPUT") {
          if (element.hasAttribute('data-i18n-placeholder')) {
              element.placeholder = langData[element.getAttribute('data-i18n-placeholder')];
          } else {
              element.value = langData[key];
          }
      } else if (element.tagName == "SMALL") {
          element.textContent = langData[key];
      } else {
          element.innerHTML = langData[key];
      }
  });
}

// Sets the local language variable to the passed value
function setLanguage(language) {
    localStorage.setItem('language', language);
    location.reload();
}

// General call function to refresh the language on the page
function updateLanguage() {
    loadTranslations();
}

// Function to return the placeholder text for the generateFormLoadCustomCrossword() function.
function getPlaceholderTranslation() {
    const lang = localStorage.getItem('language') || 'en';
    return [
        translation[lang]?.leftPlaceholderOne,
        translation[lang]?.leftPlaceholderTwo,
        translation[lang]?.rightPlaceholderOne,
        translation[lang]?.rightPlaceholderTwo
    ];
}

// Initialize translations when the script loads
loadTranslations();