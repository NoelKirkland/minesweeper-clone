import '../scss/app.scss';
import * as uiElements from './ui-logic/ui-elements';
import * as uiMethods from './ui-logic/ui-helper-methods';
import { newGame } from './ui-logic/newGame';

// code enclosed in an IIFE so as to not pollute the global state
(() => {
  /* *** 1. Destructure imports for all UI assets *** */
  // the DOM elements we'll need to monitor/update:
  const {
    instructionsTooltipIcon,
    allInstructionsSections,
    topFourButtonsArr,
    gameGrid,
    buttonFace,
    difficultyInfoObj
  } = uiElements;
  // all necessary UI helper functions:
  const {
    instructionsTooltipIconListeners,
    selectDifficulty,
    setInstructionsDetailsSection
  } = uiMethods;

  /* *** 2. Implement the base functionality (i.e. header buttons, expandable instructions, ect...) *** */
  // add the hover functions to the instructions icon:
  Object.entries(instructionsTooltipIconListeners()).map(
    ([listener, callBack]) => {
      instructionsTooltipIcon[listener] = callBack;
    }
  );

  // add similar hover functions to each instructions header:
  allInstructionsSections.map(setInstructionsDetailsSection);

  // implement the functionality of the top four buttons:
  topFourButtonsArr.map((button) => {
    button.onclick = selectDifficulty(newGame);
  });

  // the emoji on the reset button switches rapidly during play:
  [
    ['onmousedown', '😮'],
    ['onmouseup', '🙂']
  ].map(([event, face]) => {
    gameGrid[event] = () => {
      buttonFace.innerText = face;
    };
  });

  /* *** 3. Set up the first game *** */
  newGame(difficultyInfoObj.current);
})();
