export class MarsRover {
  private position: { x: number; y: number; direction: string };

  constructor(position?: { x: number; y: number; direction: string }) {
    this.position = position ?? { x: 0, y: 0, direction: 'N' };
  }

  move(input: string) {
    if (this.position.direction === 'N') {
      this.position.y += 1;
    }

    if (this.position.direction === 'S') {
      this.position.y -= 1;
    }

    if (this.position.direction === 'E') {
      this.position.x += 1;
    }

    if (this.position.direction === 'W') {
      this.position.x -= 1;
    }
  }

  getPosition(): string {
    return `${this.position.x}:${this.position.y}:${this.position.direction}`;
  }
}
