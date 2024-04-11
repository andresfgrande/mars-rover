import { MarsRoverTurbo } from '../src/rovers/marsRoverTurbo';
import { RoverController } from '../src/RoverController';

describe('marsroverturbo should', () => {
  let roverController: RoverController;
  beforeEach(() => {
    const marsRoverTurbo = new MarsRoverTurbo();
    roverController = new RoverController(marsRoverTurbo);
  });

  it('Should be able to move forward 2 positions', () => {
    expect(roverController.execute('M')).toEqual('0:2:N');
  });

  it('Should be able to move forward 2 positions', () => {
    expect(roverController.execute('MMRMM')).toEqual('4:4:E');
  });
});
