import { Rover } from '../rovers/rover';
import { LunarRover } from '../rovers/lunarRover';
import { Direction } from '../directions/directions';
import { North } from '../directions/north';
import { South } from '../directions/south';
import { East } from '../directions/east';
import { West } from '../directions/west';

export class LunarRoverAdapter implements Rover {
  private direction: Direction = new North();

  constructor(private lunarRover: LunarRover) {}

  getPosition(): string {
    const [positionX, positionY] = this.lunarRover.getPosition();

    const adaptedPositionY =
      positionY % 10 < 0 ? (positionY % 10) + 10 : positionY % 10;

    const adaptedPositionX =
      positionX % 10 < 0 ? (positionX % 10) + 10 : positionX % 10;

    return `${adaptedPositionX}:${adaptedPositionY}:${this.direction.cardinalPoint}`;
  }

  moveForward(): void {
    if (this.direction instanceof North) {
      this.lunarRover.moveForward();
    }
    if (this.direction instanceof South) {
      this.lunarRover.moveBack();
    }
    if (this.direction instanceof East) {
      this.lunarRover.moveRight();
    }
    if (this.direction instanceof West) {
      this.lunarRover.moveLeft();
    }
  }

  rotateLeft(): void {
    this.direction = this.direction.rotateLeft();
  }

  rotateRight(): void {
    this.direction = this.direction.rotateRight();
  }
}
