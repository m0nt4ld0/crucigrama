/*
* ========================================================================================
*  File Name: crossword-puzzle.js
*  Author: Mariela Montaldo
*  Created: 30/05/2024
*  Last Modified: 27/03/2025
*  Version: v0.3
*
*  Description:
*  This file contains the validation and construction logic for the crossword puzzle.
*  The puzzle is organized in a 36x36 grid, centered at position 18, with vertical
*  words aligned at the center position.
*
*  Changes:
*  - Complete rewrite with localization support
*  - Improved code organization
*  - Better separation of concerns
*
*  License: GPL-3.0
* ========================================================================================
*/

class CrosswordPuzzle {
  constructor() {
      this.answers = [];
      this.vword = "";
      this.refs = [];
      this.formGenerated = false;
      this.numberOfInputs = 0;
      this.correctAnswers = 0;
      this.originalColors = {};

      // DOM Elements
      this.puzzleContainer = document.getElementById('cpuzzle');
      this.referencesContainer = document.getElementById('references');
      this.generatorContainer = document.getElementById('cpuzzle-generator-container');
      this.jsonPuzzleInput = document.getElementById('jsonpuzzle');

      // Constants
      this.GRID_SIZE = 36;
      this.CENTER_POSITION = 18;
  }

  // Initialize the puzzle
  init() {
      this.preloadCrossword();
      this.drawCrossword(this.vword, this.answers, false);
      this.setCrosswordReferences(this.refs, "references");
  }

  // Preload crossword data from JSON
  preloadCrossword() {
      try {
          const jsonData = JSON.parse(this.jsonPuzzleInput.value);
          if (jsonData && jsonData.length > 0) {
              this.answers = jsonData[0].answers || [];
              this.vword = jsonData[0].vword || "";
              this.refs = jsonData[0].refs || [];
          }
      } catch (error) {
          console.error("Error parsing JSON puzzle:", error);
      }
  }

  // Draw the crossword puzzle grid
  drawCrossword(vword, answers, showAnswers) {
      if (!vword || !answers || answers.length === 0) return;

      let html = `<form><table class="table table-borderless">`;
      this.numberOfInputs = 0;

      for (let i = 0; i < answers.length; i++) {
          html += '<tr>';
          const initPosition = Math.max(0, this.CENTER_POSITION - 
              answers[i].toLowerCase().indexOf(vword[i].toLowerCase()));

          let charIndex = 0;
          let colored = false;

          for (let j = 0; j < this.GRID_SIZE; j++) {
              if (j >= initPosition && j < initPosition + answers[i].length) {
                  const currentChar = answers[i][charIndex];
                  const isVerticalChar = currentChar.toLowerCase() === vword[i].toLowerCase();

                  if (isVerticalChar && !colored) {
                      html += `<td class="table-primary" id="clueword">
                              <input type="text" size="1" maxlength="1" readonly 
                                  value="${currentChar.toUpperCase()}" />
                          </td>`;
                      colored = true;
                  } else {
                      html += `<td class="table-secondary">
                          <input type="text" id="txt-${i}-${charIndex}" 
                              onkeyup="crossword.validateChar(${i},${charIndex})" 
                              class="form-control no-border" size="1" maxlength="1" 
                              value="${showAnswers ? currentChar : ''}"/>
                      </td>`;
                      this.numberOfInputs++;
                  }
                  charIndex++;
              } else {
                  html += '<td></td>';
              }
          }
          html += '</tr>';
      }

      this.puzzleContainer.innerHTML = html + '</table></form>';
  }

  // Set crossword references
  setCrosswordReferences(descriptions, containerId) {
      const container = document.getElementById(containerId);
      if (!container || !descriptions) return;

      let html = `<h3 data-i18n="references_title">References</h3><ol>`;
      descriptions.forEach(desc => {
          html += `<li>${desc}</li>`;
      });
      container.innerHTML = html + '</ol>';
  }

  // Validate character input
  validateChar(row, col) {
      const inputId = `txt-${row}-${col}`;
      const inputElement = document.getElementById(inputId);
      const allInputs = document.querySelectorAll('#cpuzzle .table-secondary input');

      if (!inputElement) return;

      // Clear error state if input is empty
      if (inputElement.value === "") {
          inputElement.classList.remove("wrong-answer");
          return;
      }

      const isCorrect = inputElement.value.toUpperCase() === this.answers[row][col].toUpperCase();

      inputElement.classList.toggle("wrong-answer", !isCorrect);
      inputElement.classList.toggle("correct-answer", isCorrect);

      if (isCorrect) {
          this.correctAnswers++;
          this.updateProgress();
          
          // Move focus to next input
          const nextIndex = [...allInputs].indexOf(inputElement) + 1;
          if (nextIndex < allInputs.length) {
              allInputs[nextIndex].focus();
          }
          
          inputElement.disabled = true;
      }

      if (this.checkCompletion()) {
          this.showCompletionModal();
      }
  }

  // Check if all answers are correct
  checkCompletion() {
      return this.answers.every((word, row) => 
          [...word].every((char, col) => {
              const input = document.getElementById(`txt-${row}-${col}`);
              return !input || input.value.toUpperCase() === char.toUpperCase();
          })
      );
  }

  // Show completion modal
  showCompletionModal() {
      setTimeout(() => {
          const lang = localStorage.getItem('language') || 'en';
          const modalHtml = `
              <div class="modal fade" id="completionModal" tabindex="-1">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title" data-i18n="congratulations_title">
                                  ${translation[lang]?.congratulations_title || "Congratulations"}
                              </h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                          </div>
                          <div class="modal-body" data-i18n="congratulations_message">
                              ${translation[lang]?.congratulations_message || "You have successfully completed the puzzle"}
                          </div>
                      </div>
                  </div>
              </div>`;
          
          document.body.insertAdjacentHTML('beforeend', modalHtml);
          const modal = new bootstrap.Modal(document.getElementById('completionModal'));
          modal.show();
      }, 50);
  }

  // Restart the puzzle
  restart() {
      this.referencesContainer.innerHTML = '';
      this.puzzleContainer.innerHTML = '';
      this.correctAnswers = 0;
      this.updateProgress();
      this.drawCrossword(this.vword, this.answers, false);
      this.setCrosswordReferences(this.refs, "references");
      
      const lang = localStorage.getItem('language') || 'en';
      alert(translation[lang]?.alert_ready || "Ready!");
  }

  // Load puzzle from JSON input
  loadFromJSON() {
      try {
          const jsonData = JSON.parse(this.jsonPuzzleInput.value);
          if (jsonData && jsonData.length > 0) {
              this.answers = jsonData[0].answers || [];
              this.vword = jsonData[0].vword || "";
              this.refs = jsonData[0].refs || [];
              
              this.referencesContainer.innerHTML = '';
              this.puzzleContainer.innerHTML = '';
              this.drawCrossword(this.vword, this.answers, false);
              this.setCrosswordReferences(this.refs, "references");
              
              const lang = localStorage.getItem('language') || 'en';
              alert(translation[lang]?.alert_ready || "Ready!");
          }
      } catch (error) {
          console.error("Error loading from JSON:", error);
      }
  }

  // Update progress bar
  updateProgress() {
      const progressBar = document.querySelector('.progress-bar');
      if (progressBar) {
          const progress = (this.correctAnswers / this.numberOfInputs) * 100;
          progressBar.style.width = `${progress}%`;
      }
  }

  // Print the crossword
  printCrossword() {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
          <html>
              <head>
                  <title>Crucigrama | ${this.vword || ''}</title>
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
              </head>
              <body>
                  ${this.puzzleContainer.innerHTML}
                  ${this.referencesContainer.innerHTML}
              </body>
          </html>
      `);
      printWindow.document.close();
      printWindow.print();
  }

  // Show answers
  showAnswers() {
      this.puzzleContainer.innerHTML = '';
      this.drawCrossword(this.vword, this.answers, true);
  }

  // Generate custom crossword form
  generateFormLoadCustomCrossword(placeholderTranslation) {
      const vwordInput = document.getElementById('txt-vword');
      const vword = vwordInput.value.toUpperCase();

      if (!vword) {
          const lang = localStorage.getItem('language') || 'en';
          alert(translation[lang]?.alert_something_wrong || "Something went wrong... Did you load the vertical word?");
          vwordInput.focus();
          this.generatorContainer.innerHTML = '';
          this.formGenerated = false;
          return;
      }

      if (this.formGenerated) {
          this.generatorContainer.innerHTML = '';
      }

      const [
          left1 = "Word that contains the letter",
          left2 = "answer, word #",
          right1 = "Reference to the word #",
          right2 = "which contains the letter"
      ] = placeholderTranslation || [];

      for (let i = 0; i < vword.length; i++) {
          this.generatorContainer.innerHTML += `
              <div class="row mb-2">
                  <div class="col">
                      <input type="text" class="form-control"
                          placeholder="${left1} ${vword[i]} (${left2}${i + 1})"
                          id="txt-hword-${i}">
                  </div>
                  <div class="col">
                      <input type="text" class="form-control"
                          placeholder="${right1}${i + 1} ${right2} ${vword[i]}"
                          id="txt-refs-${i}">
                  </div>
              </div>`;
      }

      this.generatorContainer.innerHTML += `
          <div class="row mt-3">
              <div class="col">
                  <input data-i18n="json_mode_button" type="button"
                      class="form-control btn btn-secondary"
                      onclick="crossword.showJsonForm()">
              </div>
              <div class="col">
                  <input data-i18n="generate_button" type="button"
                      class="form-control btn btn-primary"
                      onclick="crossword.generateCustomCrossword()">
              </div>
          </div>`;

      this.formGenerated = true;
      updateLanguage(); // Update localized button texts
  }

  // Generate custom crossword from form
  generateCustomCrossword() {
      const vword = document.getElementById('txt-vword').value.toUpperCase();
      this.vword = vword;
      this.answers = [];
      this.refs = [];

      for (let i = 0; i < vword.length; i++) {
          const answer = document.getElementById(`txt-hword-${i}`).value.toLowerCase();
          const reference = document.getElementById(`txt-refs-${i}`).value;
          
          if (answer && reference) {
              this.answers.push(answer);
              this.refs.push(reference);
          }
      }

      this.puzzleContainer.innerHTML = '';
      this.referencesContainer.innerHTML = '';
      this.drawCrossword(vword, this.answers, false);
      this.setCrosswordReferences(this.refs, "references");
  }

  // Show JSON form
  showJsonForm() {
      const vword = document.getElementById('txt-vword').value.toUpperCase();
      this.generateJSONTemplate(vword);
      document.getElementById('crossword-code').style.visibility = "visible";
  }

  // Generate JSON template
  generateJSONTemplate(vword) {
      const lang = localStorage.getItem('language') || 'en';
      const refPrefix = translation[lang]?.reference_x || "Reference ";
      const wordPrefix = translation[lang]?.word_x || "Word ";

      const template = [{
          vword: vword,
          refs: Array.from({length: vword.length}, (_, i) => refPrefix + (i + 1)),
          answers: Array.from({length: vword.length}, (_, i) => wordPrefix + (i + 1))
      }];

      this.jsonPuzzleInput.value = JSON.stringify(template, null, 2);
  }
}

// Initialize global crossword instance
const crossword = new CrosswordPuzzle();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  crossword.init();
  
  // Keyboard navigation
  document.addEventListener('keydown', e => {
      const directionKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
      const focusedElement = document.activeElement;
      
      if (directionKeys.includes(e.code) && crossword.puzzleContainer.contains(focusedElement)) {
          e.preventDefault();
          this.handleKeyboardNavigation(e.code, focusedElement);
      }
  });
});

/**
 * Handles keyboard navigation between crossword cells
 * @param {string} key - The keyboard key pressed
 * @param {HTMLElement} focusedElement - Currently focused input element
 */
function handleKeyboardNavigation(key, focusedElement) {
  const allCells = Array.from(document.querySelectorAll('#cpuzzle .table-secondary input'));
  const currentIndex = allCells.indexOf(focusedElement);
  
  if (currentIndex === -1) return; // Element not found in puzzle

  const puzzleContainer = document.getElementById('cpuzzle');
  const cellsPerRow = this.GRID_SIZE; // Use the class constant
  const totalRows = Math.ceil(allCells.length / cellsPerRow);

  // Get current position in grid
  const currentRow = Math.floor(currentIndex / cellsPerRow);
  const currentCol = currentIndex % cellsPerRow;

  let nextIndex = currentIndex;

  switch(key) {
      case 'ArrowLeft':
          // Move left, wrapping to previous row if needed
          if (currentCol > 0) {
              nextIndex = currentIndex - 1;
          } else if (currentRow > 0) {
              nextIndex = (currentRow * cellsPerRow) - 1;
          }
          break;

      case 'ArrowRight':
          // Move right, wrapping to next row if needed
          if (currentCol < cellsPerRow - 1 && currentIndex < allCells.length - 1) {
              nextIndex = currentIndex + 1;
          } else if (currentRow < totalRows - 1) {
              nextIndex = ((currentRow + 1) * cellsPerRow);
          }
          break;

      case 'ArrowUp':
          // Move up to same column in previous row
          if (currentRow > 0) {
              const potentialIndex = currentIndex - cellsPerRow;
              if (potentialIndex >= 0) {
                  nextIndex = potentialIndex;
              }
          }
          break;

      case 'ArrowDown':
          // Move down to same column in next row
          if (currentRow < totalRows - 1) {
              const potentialIndex = currentIndex + cellsPerRow;
              if (potentialIndex < allCells.length) {
                  nextIndex = potentialIndex;
              }
          }
          break;

      case 'Backspace':
          // Clear current cell and move left
          if (focusedElement.value === '' && currentIndex > 0) {
              nextIndex = currentIndex - 1;
          }
          focusedElement.value = '';
          focusedElement.classList.remove('correct-answer', 'wrong-answer');
          break;

      default:
          // For letter inputs, auto-advance to next cell
          if (key.length === 1 && key.match(/[a-z]/i)) {
              if (currentIndex < allCells.length - 1) {
                  nextIndex = currentIndex + 1;
              }
              // Validate the character immediately
              const row = Math.floor(currentIndex / cellsPerRow);
              const col = currentIndex % cellsPerRow;
              crossword.validateChar(row, col);
          }
          return; // Don't change focus for non-navigation keys
  }

  // Focus the next cell if it exists and is different
  if (nextIndex !== currentIndex && allCells[nextIndex]) {
      allCells[nextIndex].focus();
      
      // For arrow navigation, select the text in the new cell
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) {
          allCells[nextIndex].select();
      }
  }
}
document.addEventListener('keydown', e => {
  const focusedElement = document.activeElement;
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Backspace'].includes(e.key) || 
      (e.key.length === 1 && e.key.match(/[a-z]/i))) {
      if (crossword.puzzleContainer.contains(focusedElement)) {
          e.preventDefault();
          crossword.handleKeyboardNavigation(e.key, focusedElement);
      }
  }
});