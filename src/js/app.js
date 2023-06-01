import '../scss/app.scss';
import * as uiVariables from './uiVariables';
import * as uiHelpers from './uiHelpers';
import MineField from './classes/minefield';

// code enclosed in an IIFE so as to not pollute the global state
(() => {
  /* *** 1. Destructure imports for all UI assets *** */
  // all DOM nodes which require added functionality:
  const {
    instructionsTooltipIcon,
    allInstructionsSections,
    topFourButtonsArr,
    gameGrid,
    buttonFace,
    timerDisplay,
    numMinesRemaining,
    gameBoard,
    difficultyInfoObj
  } = uiVariables;
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
  // all countdown display functions:
  const { startTimer, pauseTimer, resetTimer } = allTimerFunctions(
    timerDisplay,
    uiVariables.classes.headerClass
  );

  /* *** 2. Assemble the game board *** */
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

  /* *** where it all comes together... *** */
  function newGame({ numCols, numRows, numMines }) {
    // generate a new MineField class:
    const newMineField = new MineField(numCols, numRows, numMines);
    newMineField.layTiles();

    // clear existing game board state:
    clearGameBoard();
    resetTimer();

    // set up new game board:
    updateMineCounter(newMineField.numUnflaggedMines, numMinesRemaining);
    gameGrid.style.gridTemplateColumns = `repeat(${numCols}, 28px)`;

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

      gameGrid.appendChild(thisTileNode);
    });

    // and lastly, ease into view. Nice!
    gameBoard.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }

  // generates a new game on load:
  newGame(difficultyInfoObj.current);
})();
