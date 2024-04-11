import { MarsRover } from '../src/marsRover';
import { North } from '../src/directions/north';
import { East } from '../src/directions/east';
import { South } from '../src/directions/south';
import { West } from '../src/directions/west';
import { Direction } from '../src/directions/directions';

describe('marsrover should', () => {
  //arrange - given
  //act - when
  //assert - then

  /** MOVING FORWARD **/
  it.each([
    ['N', { x: 0, y: 0, direction: new North() }, '0:1:N'],
    ['S', { x: 0, y: 1, direction: new South() }, '0:0:S'],
    ['E', { x: 0, y: 0, direction: new East() }, '1:0:E'],
    ['W', { x: 1, y: 0, direction: new West() }, '0:0:W'],
  ])(
    'Move forward 1 position when orientation is %s',
    (
      orientation: string,
      initialPosition: { x: number; y: number; direction: Direction },
      expectedPosition: string,
    ) => {
      const marsRover = new MarsRover(initialPosition);

      marsRover.move('M');

      expect(marsRover.getPosition()).toEqual(expectedPosition);
    },
  );

  /** ROTATE RIGHT **/
  it.each([
    ['N', 'E', { x: 0, y: 0, direction: new North() }, '0:0:E'],
    ['E', 'S', { x: 0, y: 0, direction: new East() }, '0:0:S'],
    ['S', 'W', { x: 0, y: 0, direction: new South() }, '0:0:W'],
    ['W', 'N', { x: 0, y: 0, direction: new West() }, '0:0:N'],
  ])(
    'Rotate right to %s when orientation is %s',
    (
      orientation: string,
      expectedOrientation: string,
      initialPosition: { x: number; y: number; direction: Direction },
      expectedPosition: string,
    ) => {
      const marsRover = new MarsRover(initialPosition);

      marsRover.move('R');

      expect(marsRover.getPosition()).toEqual(expectedPosition);
    },
  );

  /** ROTATE LEFT **/
  it('Rotate Left to W when orientation is N', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new North() });

    marsRover.move('L');

    expect(marsRover.getPosition()).toEqual('0:0:W');
  });

  it('Rotate Left to S when orientation is W', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new West() });

    marsRover.move('L');

    expect(marsRover.getPosition()).toEqual('0:0:S');
  });

  it('Rotate Left to E when orientation is S', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new South() });

    marsRover.move('L');

    expect(marsRover.getPosition()).toEqual('0:0:E');
  });

  it('Rotate Left to N when orientation is E', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new East() });

    marsRover.move('L');

    expect(marsRover.getPosition()).toEqual('0:0:N');
  });

  it('Move to 2:3:N when input is MMRMMLM', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new North() });

    marsRover.move('MMRMMLM');

    expect(marsRover.getPosition()).toEqual('2:3:N');
  });

  it('Move to 2:1:N when input is RMMLM', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new North() });

    marsRover.move('RMMLM');

    expect(marsRover.getPosition()).toEqual('2:1:N');
  });

  it('Move to 0:3:N when input is MMM', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new North() });

    marsRover.move('MMM');

    expect(marsRover.getPosition()).toEqual('0:3:N');
  });

  it('Move to 0:1:N when input is MMMMMMMMMMM', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new North() });

    marsRover.move('MMMMMMMMMMM');

    expect(marsRover.getPosition()).toEqual('0:1:N');
  });

  /** OVERFLOW N **/
  it('Move to 0:0:N when input is MMMMMMMMMM', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new North() });

    marsRover.move('MMMMMMMMMM');

    expect(marsRover.getPosition()).toEqual('0:0:N');
  });

  /** OVERFLOW S **/
  it('go to the top of the grid', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new South() });

    marsRover.move('M');

    expect(marsRover.getPosition()).toEqual('0:9:S');
  });

  it('Move to 0:0:N when input is MMMMMMMMMMMMMMMMMMMM', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new North() });

    marsRover.move('MMMMMMMMMMMMMMMMMMMM');

    expect(marsRover.getPosition()).toEqual('0:0:N');
  });

  /** OVERFLOW E **/
  it('go to the beginning of the grid', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new East() });

    marsRover.move('MMMMMMMMMM');

    expect(marsRover.getPosition()).toEqual('0:0:E');
  });

  /** OVERFLOW W **/
  it('go to the end of the grid', () => {
    const marsRover = new MarsRover({ x: 0, y: 0, direction: new West() });

    marsRover.move('M');

    expect(marsRover.getPosition()).toEqual('9:0:W');
  });
});
