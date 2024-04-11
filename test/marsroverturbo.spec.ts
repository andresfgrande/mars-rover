import { MarsRoverTurbo } from '../src/marsRoverTurbo';

describe('marsroverturbo should', () => {
  let marsRoverTurbo: MarsRoverTurbo;
  beforeEach(() => {
    marsRoverTurbo = new MarsRoverTurbo();
  });

  it('Should be able to move forward 2 positions', () => {
    marsRoverTurbo.move('M');

    expect(marsRoverTurbo.getPosition()).toEqual('0:2:N');
  });

  it('Should be able to move forward 2 positions', () => {
    marsRoverTurbo.move('MMRMM');

    expect(marsRoverTurbo.getPosition()).toEqual('4:4:E');
  });
});
