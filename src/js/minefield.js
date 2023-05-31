import Tile from './tile';

class MineField {
  allTiles = {};
  mineIdArr = [];
  allTilesConcealed = true;
  mineTripped = false;
  constructor(numCols, numRows, numMines) {
    this.numCols = numCols;
    this.numRows = numRows;
    this.totalTiles = numCols * numRows;
    this.numMines = numMines;
    this.numUnflaggedMines = numMines;
    this.numConcealedNonMineTiles = numCols * numRows - numMines;
  }

  findAllAdjTileIds(id) {
    const x = id.split('x')[0] * 1,
      y = id.split('x')[1] * 1,
      adjTileIds = [
        `${x - 1}x${y + 1}`,
        `${x}x${y + 1}`,
        `${x + 1}x${y + 1}`,
        `${x - 1}x${y}`,
        `${x + 1}x${y}`,
        `${x - 1}x${y - 1}`,
        `${x}x${y - 1}`,
        `${x + 1}x${y - 1}`,
      ],
      that = this;

    function isValidId(id) {
      const x = id.split('x')[0] * 1,
        y = id.split('x')[1] * 1;

      return x && y && x <= that.numCols && y <= that.numRows;
    }

    return adjTileIds.filter((id) => isValidId(id));
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
      let newTile = new Tile(curCol, curRow, tileIndex);
      this.allTiles[`${curCol}x${curRow}`] = newTile;
      tileIndex++;
    });
  }

  layMines(firstRevealedTileId) {
    this.allTilesConcealed = false;

    const generateRandomIdArr = () => {
      const { numCols, numMines, totalTiles } = this;
      const findIdFromIndex = (index) => {
        let row = Math.ceil(index / numCols),
          col = index - (row - 1) * numCols;

        return `${col}x${row}`;
      };
      let randomIdArr = [];

      while (randomIdArr.length < numMines) {
        const randomIndex = Math.floor(Math.random() * totalTiles) + 1,
          randomId = findIdFromIndex(randomIndex);

        if (
          !randomIdArr.includes(randomId) &&
          randomId !== firstRevealedTileId
        ) {
          randomIdArr.push(randomId);
        }
      }
      return randomIdArr;
    };
    const layMine = (id) => {
      const tile = this.allTiles[id],
        allAdjTileIds = this.findAllAdjTileIds(id);

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
    tile.isFlagged ? this.numUnflaggedMines-- : this.numUnflaggedMines++;
  }
}

export default MineField;