import { MarsRover } from '../src/marsRover';

describe('marsrover should', () => {
  //arrange - given
  //act - when
  //assert - then

  it.each([
    ['N', { x: 0, y: 0, direction: 'N' }, '0:1:N'],
    ['S', { x: 0, y: 1, direction: 'S' }, '0:0:S'],
    ['E', { x: 0, y: 0, direction: 'E' }, '1:0:E'],
    ['W', { x: 1, y: 0, direction: 'W' }, '0:0:W'],
  ])(
    'Move forward 1 position when orientation is %s',
    (
      orientation: string,
      initialPosition: { x: number; y: number; direction: string },
      expectedPosition: string,
    ) => {
      const marsRover = new MarsRover(initialPosition);

      marsRover.move('M');

      expect(marsRover.getPosition()).toEqual(expectedPosition);
    },
  );

  it('Rotate right to E when orientation is N', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: 'N' });

    marsRover.move('R');

    expect(marsRover.getPosition()).toEqual('0:0:E');
  });

  it('Rotate right to S when orientation is E', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: 'E' });

    marsRover.move('R');

    expect(marsRover.getPosition()).toEqual('0:0:S');
  });

  it('Rotate right to W when orientation is S', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: 'S' });

    marsRover.move('R');

    expect(marsRover.getPosition()).toEqual('0:0:W');
  });

  it('Rotate right to N when orientation is W', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: 'W' });

    marsRover.move('R');

    expect(marsRover.getPosition()).toEqual('0:0:N');
  });

  it('Rotate Left to W when orientation is N', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: 'N' });

    marsRover.move('L');

    expect(marsRover.getPosition()).toEqual('0:0:W');
  });

  it('Rotate Left to S when orientation is W', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: 'W' });

    marsRover.move('L');

    expect(marsRover.getPosition()).toEqual('0:0:S');
  });

  it('Rotate Left to E when orientation is S', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: 'S' });

    marsRover.move('L');

    expect(marsRover.getPosition()).toEqual('0:0:E');
  });

  it('Rotate Left to N when orientation is E', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: 'E' });

    marsRover.move('L');

    expect(marsRover.getPosition()).toEqual('0:0:N');
  });

  it('Move to 2:3:N when input is MMRMMLM', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: 'N' });

    marsRover.move('MMRMMLM');

    expect(marsRover.getPosition()).toEqual('2:3:N');
  });

  it('Move to 2:1:N when input is RMMLM', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: 'N' });

    marsRover.move('RMMLM');

    expect(marsRover.getPosition()).toEqual('2:1:N');
  });
});
