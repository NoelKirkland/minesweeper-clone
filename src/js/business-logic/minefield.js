import Tile from './tile';

class MineField {
  constructor(numCols, numRows, numMines) {
    this.numCols = numCols;
    this.numRows = numRows;
    this.totalTiles = numCols * numRows;
    this.numMines = numMines;
    this.numUnflaggedMines = numMines;
    this.numConcealedNonMineTiles = numCols * numRows - numMines;
    this.allTiles = {};
    this.mineIdArr = [];
    this.allTilesConcealed = true;
    this.mineTripped = false;
  }

  isValidId(id) {
    const x = id.split('x')[0] * 1;
    const y = id.split('x')[1] * 1;

    return x && y && x <= this.numCols && y <= this.numRows;
  }

  findAllAdjTileIds(id) {
    const x = id.split('x')[0] * 1;
    const y = id.split('x')[1] * 1;
    const adjTileIds = [
      `${x - 1}x${y + 1}`,
      `${x}x${y + 1}`,
      `${x + 1}x${y + 1}`,
      `${x - 1}x${y}`,
      `${x + 1}x${y}`,
      `${x - 1}x${y - 1}`,
      `${x}x${y - 1}`,
      `${x + 1}x${y - 1}`
    ];

    return adjTileIds.filter((adjId) => this.isValidId(adjId));
  }

  iterateOverAllTiles(callbackFunc) {
    for (let row = 1; row <= this.numRows; row++) {
      for (let col = 1; col <= this.numCols; col++) {
        callbackFunc({ curCol: col, curRow: row });
      }
    }
  }

  layTiles() {
    let tileIndex = 1;

    this.iterateOverAllTiles(({ curCol, curRow }) => {
      const newTile = new Tile(curCol, curRow, tileIndex);
      this.allTiles[`${curCol}x${curRow}`] = newTile;
      tileIndex++;
    });
  }

  layMines(firstRevealedTileId) {
    this.allTilesConcealed = false;

    const generateRandomIdArr = () => {
      const { numCols, numMines, totalTiles } = this;
      const findIdFromIndex = (index) => {
        const row = Math.ceil(index / numCols);
        const col = index - (row - 1) * numCols;

        return `${col}x${row}`;
      };
      const randomIdArr = [];

      while (randomIdArr.length < numMines) {
        const randomIndex = Math.floor(Math.random() * totalTiles) + 1;
        const randomId = findIdFromIndex(randomIndex);

        if (
          !randomIdArr.includes(randomId) && randomId !== firstRevealedTileId
        ) {
          randomIdArr.push(randomId);
        }
      }
      return randomIdArr;
    };
    const layMine = (id) => {
      const tile = this.allTiles[id];
      const allAdjTileIds = this.findAllAdjTileIds(id);

      tile.armMine();
      allAdjTileIds.map((adjId) => {
        const adjTile = this.allTiles[adjId];

        adjTile.numAdjMines++;
      });
    };

    this.mineIdArr = generateRandomIdArr();
    this.mineIdArr.map((id) => layMine(id));
  }

  revealTile(tile) {
    if (tile.isMine) {
      this.mineTripped = true;
    } else {
      tile.isConcealed = false;
      this.numConcealedNonMineTiles--;
    }
  }

  toggleTileFlag(tile) {
    tile.toggleFlag();
    return tile.isFlagged ? this.numUnflaggedMines-- : this.numUnflaggedMines++;
  }
}

export default MineField;
