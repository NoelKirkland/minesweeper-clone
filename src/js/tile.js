class Tile {
  isMine = false;
  isConcealed = true;
  isFlagged = false;
  numAdjMines = 0;
  constructor(col, row, index){
    this.col = col;
    this.row = row;
    this.index = index;
    this.id = `${col}x${row}`;
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