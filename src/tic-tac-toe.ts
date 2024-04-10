export enum Players {
  playerX = 'X',
  playerO = 'O',
}

export default class TicTacToe {
  //Wrap in class to manage board methods
  private board: (Players | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  //Wrap in class to manage players methods
  private players: Players[] = [Players.playerX, Players.playerO];

  //Cambiar por constructor con parametro board opcional
  public setBoard(board: (Players | null)[][]): void {
    this.board = board;
  }

  //Cambiar por print board
  public getBoard(): (Players | null)[][] {
    return this.board;
  }

  public takeField(x: number, y: number, player: Players): boolean {
    if (this.isGameOver()) {
      return false;
    }

    if (this.players[0] !== player) {
      return false;
    }

    if (this.getField(x, y) !== null) {
      return false;
    }

    this.board[x][y] = player;

    this.players.reverse();
    return true;
  }

  public isGameOver(): boolean {
    return (
      this.checkRows() ||
      this.checkColumns() ||
      this.checkDiagonals() ||
      this.checkDraw()
    );
  }

  private getField(x: number, y: number): string | null {
    return this.board[x][y];
  }

  private checkRows(): boolean {
    let isRowFull = false;
    for (let i = 0; i < this.board.length && !isRowFull; i++) {
      isRowFull = this.isRowFull(this.board[i]);
    }

    return isRowFull;
  }

  private isRowFull(row: (string | null)[]): boolean {
    if (row[0] && row[0] === row[1] && row[1] === row[2]) {
      return true;
    }
    return false;
  }

  private checkColumns(): boolean {
    let isColumnFull = false;
    for (let col = 0; col < 3 && !isColumnFull; col++) {
      isColumnFull = this.isColumnFull(col);
    }
    return isColumnFull;
  }

  private isColumnFull(col: number): boolean {
    if (
      this.board[0][col] &&
      this.board[0][col] === this.board[1][col] &&
      this.board[1][col] === this.board[2][col]
    ) {
      return true;
    }
  }

  private checkDiagonals(): boolean {
    // Check both diagonals
    return (
      (this.board[0][0] &&
        this.board[0][0] === this.board[1][1] &&
        this.board[1][1] === this.board[2][2]) ||
      (this.board[0][2] &&
        this.board[0][2] === this.board[1][1] &&
        this.board[1][1] === this.board[2][0])
    );
  }

  private checkDraw(): boolean {
    let isCellAvailable = false;

    for (let i = 0; i < this.board.length && !isCellAvailable; i++) {
      isCellAvailable = this.isAnyCellAvailableInRow(i);
    }

    return !isCellAvailable;
  }

  private isAnyCellAvailableInRow(i: number) {
    let isCellAvailable = false;
    for (let j = 0; j < this.board[i].length && !isCellAvailable; j++) {
      isCellAvailable = this.isCellAvailable(this.board[i][j]);
    }
    return isCellAvailable;
  }

  private isCellAvailable(cell: string): boolean {
    return cell !== null;
  }
}
