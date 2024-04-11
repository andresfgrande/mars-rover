import { RoverController } from '../src/RoverController';
import { MarsRover } from '../src/rovers/marsRover';
import { TurboRover } from '../src/decorators/TurboRover';

describe('Lunar Rover turbo Decorator', () => {
  let roverController: RoverController;
  beforeEach(() => {
    const marsRover: MarsRover = new MarsRover();
    const turboRover: TurboRover = new TurboRover(marsRover);
    roverController = new RoverController(turboRover);
  });

  it('Should be able to move forward 2 positions', () => {
    expect(roverController.execute('M')).toEqual('0:2:N');
  });

  it('Should be able to go to the correct position', () => {
    expect(roverController.execute('MMRMM')).toEqual('4:4:E');
  });
});
