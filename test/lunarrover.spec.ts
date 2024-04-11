import { LunarRover } from '../src/rovers/lunarRover';
import { RoverController } from '../src/RoverController';
import { LunarRoverAdapter } from '../src/adapters/LunarRoverAdapter';

describe('Lunar rover should', () => {
  let roverController: RoverController;
  beforeEach(() => {
    const lunarRover = new LunarRover(0, 0);
    const roverAdapter: LunarRoverAdapter = new LunarRoverAdapter(lunarRover);
    roverController = new RoverController(roverAdapter);
  });
  it('have as initial position bottom left of the grid', () => {
    expect(roverController.execute('')).toEqual('0:0:N');
  });

  it('move forward', () => {
    expect(roverController.execute('MM')).toEqual('0:2:N');
  });

  it('move to the left', () => {
    expect(roverController.execute('LM')).toEqual('9:0:W');
  });

  it('move to the correcto postion', () => {
    expect(roverController.execute('MMRMMLM')).toEqual('2:3:N');
  });
});
