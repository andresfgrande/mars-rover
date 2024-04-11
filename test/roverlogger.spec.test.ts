import { RoverLogger } from '../src/RoverLogger';
import { MarsRover } from '../src/rovers/marsRover';
import { RoverController } from '../src/RoverController';

describe('rover logger should', () => {
  const rover = new MarsRover();
  const roverLogger = new RoverLogger(rover);

  const roverController = new RoverController(roverLogger);
  it('log something on each call', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    expect(roverController.execute('LMR')).toEqual('9:0:N');
    expect(consoleSpy).toHaveBeenCalledWith('Rotating left');
    expect(consoleSpy).toHaveBeenCalledWith('Moving forward');
    expect(consoleSpy).toHaveBeenCalledWith('Rotating right');
  });
});
