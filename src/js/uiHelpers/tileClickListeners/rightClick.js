import { numMinesRemaining } from '../../uiVariables';

export function rightClick({ mineField, updateMineCounter, newTileNode }) {
  return (event) => {
    event.preventDefault();
    const thisTile = mineField.allTiles[event.target.dataset.colAndRow];

    if (thisTile.isConcealed) {
      mineField.toggleTileFlag(thisTile);
      if (thisTile.isFlagged) {
        event.target.appendChild(newTileNode('🚩'));
      } else {
        const currFlag = event.target.firstChild;
        event.target.removeChild(currFlag);
      }
      updateMineCounter(mineField.numUnflaggedMines, numMinesRemaining);
    }
  };
}
