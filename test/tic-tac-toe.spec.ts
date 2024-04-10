import TicTacToe from '../src/tic-tac-toe';

describe('tictac-toe', () => {
  let ticTacToe: TicTacToe;

  beforeEach(() => {
    ticTacToe = new TicTacToe();
  });

  it('Should be game over when all fields in a row are taken', () => {
    const board: (string | null)[][] = [
      ['X', 'X', 'X'],
      [null, null, null],
      [null, null, null],
    ];

    ticTacToe.setBoard(board);

    expect(ticTacToe.isGameOver()).toBe(true);
  });

  it('a game is over when all fields in a diagonal are taken by a player', () => {
    const board: (string | null)[][] = [
      ['X', null, null],
      [null, 'X', null],
      [null, null, 'X'],
    ];
    ticTacToe.setBoard(board);
    expect(ticTacToe.isGameOver()).toBe(true);
  });

  it('a game is over when all fields are taken', () => {
    const board: (string | null)[][] = [
      ['X', 'X', 'Y'],
      ['Y', 'X', 'Y'],
      ['X', 'Y', 'X'],
    ];
    ticTacToe.setBoard(board);
    expect(ticTacToe.isGameOver()).toBe(true);
  });

  it(' a game is over when all fields in a column are taken by a player', () => {
    const board: (string | null)[][] = [
      ['Y', null, null],
      ['Y', null, null],
      ['Y', null, null],
    ];
    ticTacToe.setBoard(board);
    expect(ticTacToe.isGameOver()).toBe(true);
  });

  it('a game has nine fields in a 3x3 grid', () => {
    const board: (string | null)[][] = ticTacToe.getBoard();

    expect(board.length).toBe(3);
    expect(board[0].length).toBe(3);
    expect(board[1].length).toBe(3);
    expect(board[2].length).toBe(3);
  });

  it('there are two players in the game (X and O)', () => {
    //expect(ticTacToe.checkPlayersXO()).toBe(true);
  });

  it('players take turns taking fields until the game is over', () => {
    const board: (string | null)[][] = [
      ['X', 'X', 'Y'],
      [null, null, null],
      [null, null, null],
    ];

    ticTacToe.setBoard(board);
    expect(ticTacToe.takeField(2, 2, 'X')).toBe(true);
    const boardAux: (string | null)[][] = ticTacToe.getBoard();
    expect(boardAux[2][2]).toBe('X');
  });

  it('a player can take a field if not already taken', () => {
    const board: (string | null)[][] = [
      ['X', 'X', null],
      [null, null, null],
      [null, null, null],
    ];

    ticTacToe.setBoard(board);
    expect(ticTacToe.takeField(0, 2, 'X')).toBe(true);
  });

  it("a player can't take a field if not already taken", () => {
    const board: (string | null)[][] = [
      ['X', 'X', null],
      [null, null, null],
      [null, null, null],
    ];

    ticTacToe.setBoard(board);
    expect(ticTacToe.takeField(0, 1, 'X')).toBe(false);
  });
});
