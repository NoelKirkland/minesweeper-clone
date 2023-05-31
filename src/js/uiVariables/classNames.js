const baseClass = 'minesweeper';
const gameBoardClass = 'game-board';
const headerClass = '.' + gameBoardClass + '__header-row';
const headerCountBox = headerClass + '_counter-box-nums';
const instructionsTooltipIconClass = headerClass + '--tooltip-icon';
const gameGridClass = gameBoardClass + '__grid-area';
const tileClass = gameGridClass + '_tile';
const instructionsClass = '.' + gameBoardClass + '__instructions';
const instructionsDetailsPanelClass = instructionsClass + '_details-panel';

export const classes = {
  baseClass: baseClass,
  gameBoardClass: gameBoardClass,
  headerClass: headerClass,
  headerCountBox: headerCountBox,
  instructionsTooltipIconClass: instructionsTooltipIconClass,
  gameGridClass: gameGridClass,
  tileClass: tileClass,
  instructionsClass: instructionsClass,
  instructionsDetailsPanelClass: instructionsDetailsPanelClass
};
