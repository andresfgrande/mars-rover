import { Rover } from './rovers/rover';

export class RoverLogger implements Rover {
  constructor(private rover: Rover) {}

  getPosition(): string {
    return this.rover.getPosition();
  }

  moveForward(): void {
    console.log('Moving forward');
    this.rover.moveForward();
  }

  rotateLeft(): void {
    console.log('Rotating left');
    this.rover.rotateLeft();
  }

  rotateRight(): void {
    console.log('Rotating right');
    this.rover.rotateRight();
  }
}
