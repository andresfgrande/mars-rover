import { Rover } from './rovers/rover';
import { MoveForward } from './commands/MoveForward';
import { RotateRight } from './commands/RotateRight';
import { RotateLeft } from './commands/RotateLeft';

export class RoverController {
  constructor(private rover: Rover) {}

  execute(input: string) {
    for (const order of input) {
      if (order === 'M') {
        const moveForward = new MoveForward(this.rover);
        moveForward.execute();
      }

      if (order === 'R') {
        const rotateRight = new RotateRight(this.rover);
        rotateRight.execute();
      }

      if (order === 'L') {
        const rotateLeft = new RotateLeft(this.rover);
        rotateLeft.execute();
      }
    }
    return this.rover.getPosition();
  }
}
