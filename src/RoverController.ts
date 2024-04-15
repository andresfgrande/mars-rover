import { Rover } from './rovers/rover';
import { CommandFactory } from './commands/CommandFactory';

export class RoverController {
  constructor(private rover: Rover) {}

  execute(input: string) {
    for (const order of input) {
      CommandFactory.createCommand(order, this.rover).execute();
    }
    return this.rover.getPosition();
  }
}
