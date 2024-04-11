import { Rover } from '../rovers/rover';

export class TurboRover implements Rover {
  constructor(private rover: Rover) {}

  getPosition(): string {
    return this.rover.getPosition();
  }

  moveForward(): void {
    this.rover.moveForward();
    this.rover.moveForward();
  }

  rotateLeft(): void {
    this.rover.rotateLeft();
  }

  rotateRight(): void {
    this.rover.rotateRight();
  }
}
