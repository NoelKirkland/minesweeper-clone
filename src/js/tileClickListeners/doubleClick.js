// eslint-disable-next-line import/prefer-default-export
export function doubleClick(mineField, clickTimer, revealTileAndOrAdjTiles) {
  return (event) => {
    event.preventDefault();
    clearTimeout(clickTimer);
    const thisTile = mineField.allTiles[event.target.dataset.colAndRow];

    if (!thisTile.isConcealed && thisTile.numAdjMines) {
      const countAdjFlaggedTile = (adjTilesFlagged, id) => {
        const thisAdjTile = mineField.allTiles[id];

        if (thisAdjTile.isFlagged) adjTilesFlagged++;

        return adjTilesFlagged;
      };
      const numAdjFlaggedTiles = mineField
        .findAllAdjTileIds(thisTile.id)
        .reduce(countAdjFlaggedTile, 0);

      revealTileAndOrAdjTiles.call(mineField, thisTile, numAdjFlaggedTiles);
    }
  };
}
