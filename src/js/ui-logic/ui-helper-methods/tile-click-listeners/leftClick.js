export function leftClick({
  mineField,
  // eslint-disable-next-line no-unused-vars
  clickTimer,
  startTimer,
  pauseTimer,
  revealTileAndOrAdjTiles
}) {
  return (event) => {
    if (event.detail === 1) {
      // eslint-disable-next-line no-param-reassign
      clickTimer = setTimeout(() => {
        const thisTile = mineField.allTiles[event.target.dataset.colAndRow];

        if (!thisTile.isFlagged) {
          if (mineField.allTilesConcealed) {
            mineField.layMines(thisTile.id);
            startTimer();
          }
          if (thisTile.isConcealed) {
            revealTileAndOrAdjTiles.call(mineField, thisTile, pauseTimer);
          }
        }
      }, 175);
    }
  };
}
