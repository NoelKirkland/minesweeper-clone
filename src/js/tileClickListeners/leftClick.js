// eslint-disable-next-line import/prefer-default-export
export function leftClick(mineField, clickTimer, startTimer, revealTileAndOrAdjTiles) {
  return (event) => {
    if (event.detail === 1) {
      clickTimer = setTimeout(() => {
        const thisTile = mineField.allTiles[event.target.dataset.colAndRow];

        if (!thisTile.isFlagged) {
          if (mineField.allTilesConcealed) {
            mineField.layMines(thisTile.id);
            startTimer();
          }
          if (thisTile.isConcealed) {
            revealTileAndOrAdjTiles.call(mineField, thisTile);
          }
        }
      }, 175);
    }
  };
}
