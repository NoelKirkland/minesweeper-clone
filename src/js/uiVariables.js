import * as classes from './classNames';

export const minesweeper = document.querySelector('.' + classes.baseClass);
export const gameBoard = minesweeper.querySelector(
  '.' + classes.gameBoardClass
);
export const instructionsTooltipIcon = gameBoard.querySelector(
  classes.instructionsTooltipIcon
);
export const topFourButtonsArr = [
  ...gameBoard.querySelectorAll(classes.headerClass + '_button')
];
export const numMinesRemaining = gameBoard.querySelector(
  classes.headerCountBox + '--mines-remaining'
);
export const buttonFace = gameBoard.querySelector(
  classes.headerClass + '--reset-face'
);
export const timerDisplay = gameBoard.querySelector(
  classes.headerCountBox + '--time-elapsed'
);
export const gameGrid = gameBoard.querySelector('.' + classes.gameGridClass);
export const instructionsDetailsPanel = minesweeper.querySelector(
  classes.instructionsDetailsPanelClass
);
export const allInstructionsSections = [
  ...instructionsDetailsPanel.querySelectorAll(
    classes.instructionsDetailsPanelClass + '__section'
  )
];
export const difficultyInfoObj = {
  easy: {
    numCols: 8,
    numRows: 8,
    numMines: 10
  },
  medium: {
    numCols: 16,
    numRows: 16,
    numMines: 40
  },
  hard: {
    numCols: 30,
    numRows: 16,
    numMines: 99
  },
  current: {
    numCols: 8,
    numRows: 8,
    numMines: 10
  }
};
