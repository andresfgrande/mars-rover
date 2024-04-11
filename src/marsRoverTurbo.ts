import { Rover } from './rovers/rover';
import { Direction } from './directions/directions';
import { North } from './directions/north';
import { South } from './directions/south';
import { East } from './directions/east';
import { West } from './directions/west';

export class MarsRoverTurbo implements Rover {
  private position: { x: number; y: number; direction: Direction };

  constructor(position?: { x: number; y: number; direction: Direction }) {
    this.position = position ?? { x: 0, y: 0, direction: new North() };
  }

  move(input: string) {
    const commandsArray: string[] = input.split('');
    commandsArray.forEach((command: string) => {
      if (command === 'R') {
        this.rotateRight();
        return;
      }

      if (command === 'L') {
        this.rotateLeft();
        return;
      }

      this.moveForward();
    });
  }

  getPosition(): string {
    return `${this.position.x}:${this.position.y}:${this.position.direction.cardinalPoint}`;
  }

  private moveForward() {
    if (this.position.direction instanceof North) {
      this.position.y = (this.position.y + 2) % 10;
    }

    if (this.position.direction instanceof South) {
      const standardPosition: number = (this.position.y - 2) % 10;
      this.position.y =
        standardPosition < 0 ? standardPosition + 10 : standardPosition;
    }

    if (this.position.direction instanceof East) {
      this.position.x = (this.position.x + 2) % 10;
    }

    if (this.position.direction instanceof West) {
      const standardPosition: number = (this.position.x - 2) % 10;
      this.position.x =
        standardPosition < 0 ? standardPosition + 10 : standardPosition;
    }
  }

  private rotateRight() {
    this.position.direction = this.position.direction.rotateRight();
  }

  private rotateLeft() {
    this.position.direction = this.position.direction.rotateLeft();
  }
}
