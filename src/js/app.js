import '../scss/app.scss';
import * as uiHelpers from './uiHelpers/uiHelpers';
import * as uiVars from './uiVariables/uiVariables';
import MineField from './classes/minefield';

/* *** all code is enclosed in an IIFE so as to not pollute the global state *** */
(() => {
  // all necessary UI helper functions:
  const {
    allTimerFunctions,
    tileClickListeners,
    clearGameBoard,
    createTileNode,
    instructionsTooltipIconListeners,
    newTileNode,
    revealTileAndOrAdjTiles,
    selectDifficulty,
    setInstructionsDetailsSection,
    updateMineCounter
  } = uiHelpers;

  /* *** first some game board set up *** */
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
    uiVars.classes.headerClass
  );

  /* *** where it all comes together... *** */
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
