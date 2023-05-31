import { tileClass } from '../classNames';
import { findTileNode } from './findTileNode';
import { newTileNode } from './newTileNode';
import { gameOverStatesForGameBoard } from './gameOverStatesForGameBoard';

export function revealTileAndOrAdjTiles(
  thisTile,
  pauseTimer,
  numAdjFlaggedTiles = 9
) {
  const that = this;

  function revealTileNode(tile) {
    if (!tile.isMine) {
      const domNode = findTileNode(tile.id);

      if (tile.numAdjMines) {
        domNode.dataset.numAdjMines = tile.numAdjMines;
        domNode.appendChild(newTileNode(tile.numAdjMines));
      }
      domNode.classList.add(tileClass + '--revealed');
    }
  }
  function revealAllAdjacentTiles(tile) {
    const allAdjTileIds = that.findAllAdjTileIds(tile.id);

    allAdjTileIds.map((id) => {
      const thisAdjTile = that.allTiles[id];

      if (thisAdjTile.isConcealed && !thisAdjTile.isFlagged) {
        that.revealTile(thisAdjTile);
        revealTileNode(thisAdjTile);
        if (thisAdjTile.numAdjMines === 0) {
          revealAllAdjacentTiles(thisAdjTile);
        }
      }
    });
  }
  function checkGameResults() {
    if (that.mineTripped || !that.numConcealedNonMineTiles) {
      pauseTimer();
      const { gameBoardIfWon, gameBoardIfLost } = gameOverStatesForGameBoard();
      if (that.mineTripped) {
        gameBoardIfLost(that.mineIdArr);
      } else {
        gameBoardIfWon();
      }
    }
  }

  if (numAdjFlaggedTiles < 9) {
    if (thisTile.numAdjMines === numAdjFlaggedTiles) {
      revealAllAdjacentTiles(thisTile);
    }
  } else {
    that.revealTile(thisTile);
    revealTileNode(thisTile);
    if (thisTile.numAdjMines === 0) revealAllAdjacentTiles(thisTile);
  }
  checkGameResults();
}
