import * as uiElements from './ui-elements';
import * as uiMethods from './ui-helper-methods';
import MineField from '../business-logic/minefield';

/* *** The most important UI function, newGame is where the business and UI logic meet to create the core game play functionality. *** */
// the DOM elements we'll need to monitor/update:
const {
  timerDisplay,
  classNames,
  numMinesDisplay,
  gameBoard,
  gameGrid
} = uiElements;
// all necessary UI helper functions:
const {
  allTimerFunctions,
  tileClickListeners,
  clearGameBoard,
  createTileNode,
  newTileNode,
  revealTileAndOrAdjTiles,
  updateMineCounter
} = uiMethods;
// all countdown display functions:
const { startTimer, pauseTimer, resetTimer } = allTimerFunctions(
  timerDisplay,
  classNames.headerClass
);

export function newGame({ numCols, numRows, numMines }) {
  // generate a new MineField class:
  const newMineField = new MineField(numCols, numRows, numMines);
  newMineField.layTiles();

  // clear existing game board state:
  clearGameBoard();
  resetTimer();

  // set up new game board:
  updateMineCounter(newMineField.numUnflaggedMines, numMinesDisplay);
  gameGrid.style.gridTemplateColumns = `repeat(${numCols}, 28px)`;

  // generate all the game tiles:
  newMineField.iterateOverAllTiles(({ curCol, curRow }) => {
    const thisTile = newMineField.allTiles[`${curCol}x${curRow}`];
    const thisTileNode = createTileNode(thisTile.id);

    // the properties required for click listener functionality:
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
