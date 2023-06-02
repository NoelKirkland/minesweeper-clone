import { classNames } from './html-class-names';

export const minesweeper = document.querySelector('.' + classNames.baseClass);
export const gameBoard = minesweeper.querySelector(
  '.' + classNames.gameBoardClass
);
export const instructionsTooltipIcon = gameBoard.querySelector(
  classNames.instructionsTooltipIconClass
);
export const topFourButtonsArr = [
  ...gameBoard.querySelectorAll(classNames.headerClass + '_button')
];
export const numMinesDisplay = gameBoard.querySelector(
  classNames.headerCountBox + '--mines-remaining'
);
export const buttonFace = gameBoard.querySelector(
  classNames.headerClass + '--reset-face'
);
export const timerDisplay = gameBoard.querySelector(
  classNames.headerCountBox + '--time-elapsed'
);
export const gameGrid = gameBoard.querySelector('.' + classNames.gameGridClass);
export const instructionsDetailsPanel = minesweeper.querySelector(
  classNames.instructionsDetailsPanelClass
);
export const allInstructionsSections = [
  ...instructionsDetailsPanel.querySelectorAll(
    classNames.instructionsDetailsPanelClass + '__section'
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
