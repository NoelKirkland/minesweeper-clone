import '../scss/app.scss';
import * as classes from './classNames';
import * as uiVars from './uiVariables';
/* import {
  gameBoard, instructionsTooltipIcon, topFourButtonsArr, numMinesRemaining, buttonFace, timerDisplay, gameGrid, allInstructionsSections, difficultyInfoObj
} from './uiVariables'; */
import MineField from './classes/minefield';
import { updateMineCounter, allTimerFunctions } from './mineCountAndTimer';
// import * as uiHelp from './uiHelpers/uiHelpers';
import {
  clearGameBoard,
  createTileNode,
  instructionsTooltipIconListeners,
  newTileNode,
  revealTileAndOrAdjTiles,
  selectDifficulty,
  setInstructionsDetailsSection
} from './uiHelpers/uiHelpers';
import { tileClickListeners } from './tileClickListeners/tileClickListeners';

// all code is enclosed in an IIFE so as to not pollute the global state
(() => {
// some game board set up:
  // add the hover functions to the instructions icon:
  Object.entries(instructionsTooltipIconListeners()).map(
    ([listener, callBack]) => {
      uiVars.instructionsTooltipIcon[listener] = callBack;
    }
  );

  // add similar hover functions to each instructions header:
  uiVars.allInstructionsSections.map(setInstructionsDetailsSection);

  // implement the functionality of the top four buttons:
  uiVars.topFourButtonsArr.map((button) => {
    button.onclick = selectDifficulty(newGame);
  });

  // the emoji on the reset button switches rapidly during play:
  [
    ['onmousedown', '😮'],
    ['onmouseup', '🙂']
  ].map(([event, face]) => {
    uiVars.gameGrid[event] = () => {
      uiVars.buttonFace.innerText = face;
    };
  });

  // all countdown display functions:
  const { startTimer, pauseTimer, resetTimer } = allTimerFunctions(
    uiVars.timerDisplay,
    classes.headerClass
  );

  // and where it all comes together...
  function newGame({ numCols, numRows, numMines }) {
    // generate a new MineField class:
    const newMineField = new MineField(numCols, numRows, numMines);
    newMineField.layTiles();

    // clear existing game board state:
    clearGameBoard();
    resetTimer();

    // set up new game board:
    updateMineCounter(newMineField.numUnflaggedMines, uiVars.numMinesRemaining);
    uiVars.gameGrid.style.gridTemplateColumns = `repeat(${numCols}, 28px)`;

    // generate all the game tiles:
    newMineField.iterateOverAllTiles(({ curCol, curRow }) => {
      const thisTile = newMineField.allTiles[`${curCol}x${curRow}`];
      const thisTileNode = createTileNode(thisTile.id);

      const tileClickProps = {
        mineField: newMineField,
        clickTimer: undefined,
        startTimer: startTimer,
        pauseTimer: pauseTimer,
        updateMineCounter: updateMineCounter,
        newTileNode: newTileNode,
        revealTileAndOrAdjTiles: revealTileAndOrAdjTiles
      };

      // attach three event listeners to each tile; left-click, right-click, and double-click:
      Object.entries(tileClickListeners()).map(([listener, callBack]) => {
        thisTileNode[listener] = callBack(tileClickProps);
      });

      uiVars.gameGrid.appendChild(thisTileNode);
    });

    // and lastly, ease into view. Nice!
    uiVars.gameBoard.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }

  // generates a new game on load:
  newGame(uiVars.difficultyInfoObj.current);
})();
