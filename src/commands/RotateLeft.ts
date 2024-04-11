import { Command } from './command';
import { Rover } from '../rovers/rover';

export class RotateLeft implements Command {
  constructor(private rover: Rover) {}

  execute(): void {
    this.rover.rotateLeft();
  }
}
