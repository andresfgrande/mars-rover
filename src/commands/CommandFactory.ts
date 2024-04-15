import { Rover } from '../rovers/rover';
import { Command } from './command';
import { MoveForward } from './MoveForward';
import { RotateRight } from './RotateRight';
import { RotateLeft } from './RotateLeft';

export class CommandFactory {
  static createCommand(order: string, rover: Rover): Command {
    if (order === 'M') {
      return new MoveForward(rover);
    }

    if (order === 'R') {
      return new RotateRight(rover);
    }

    if (order === 'L') {
      return new RotateLeft(rover);
    }
  }
}
