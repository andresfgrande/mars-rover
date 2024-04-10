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
});
