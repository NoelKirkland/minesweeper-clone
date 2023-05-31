class Tile {
  constructor(col, row, index) {
    this.col = col;
    this.row = row;
    this.index = index;
    this.id = `${col}x${row}`;
    this.isMine = false;
    this.isConcealed = true;
    this.isFlagged = false;
    this.numAdjMines = 0;
  }

  toggleFlag() {
    if (this.isFlagged) {
      this.isFlagged = false;
    } else {
      this.isFlagged = true;
    }
  }

  armMine() {
    this.isMine = true;
    this.numAdjMines = NaN;
  }
}

export default Tile;
