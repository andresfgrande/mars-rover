//export type Directions = 'N' | 'S' | 'W' | 'E';

import { Direction } from '../directions/directions';
import { North } from '../directions/north';
import { South } from '../directions/south';
import { East } from '../directions/east';
import { West } from '../directions/west';
import { Rover } from './rover';

export class MarsRover implements Rover {
  private position: { x: number; y: number; direction: Direction };

  constructor(position?: { x: number; y: number; direction: Direction }) {
    this.position = position ?? { x: 0, y: 0, direction: new North() };
  }

  getPosition(): string {
    return `${this.position.x}:${this.position.y}:${this.position.direction.cardinalPoint}`;
  }

  moveForward() {
    if (this.position.direction instanceof North) {
      this.position.y = (this.position.y + 1) % 10;
    }

    if (this.position.direction instanceof South) {
      const standardPosition: number = (this.position.y - 1) % 10;
      this.position.y =
        standardPosition < 0 ? standardPosition + 10 : standardPosition;
    }

    if (this.position.direction instanceof East) {
      this.position.x = (this.position.x + 1) % 10;
    }

    if (this.position.direction instanceof West) {
      const standardPosition: number = (this.position.x - 1) % 10;
      this.position.x =
        standardPosition < 0 ? standardPosition + 10 : standardPosition;
    }
  }

  rotateRight() {
    this.position.direction = this.position.direction.rotateRight();
  }

  rotateLeft() {
    this.position.direction = this.position.direction.rotateLeft();
  }
}
