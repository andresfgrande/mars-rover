export class MarsRover {
  private position: { x: number; y: number; direction: string };

  constructor(position?: { x: number; y: number; direction: string }) {
    this.position = position ?? { x: 0, y: 0, direction: 'N' };
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
    return `${this.position.x}:${this.position.y}:${this.position.direction}`;
  }

  private moveForward() {
    if (this.position.direction === 'N') {
      this.position.y = (this.position.y + 1) % 10;
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

  private rotateRight() {
    if (this.position.direction === 'N') {
      this.position.direction = 'E';
      return;
    }
    if (this.position.direction === 'E') {
      this.position.direction = 'S';
      return;
    }

    if (this.position.direction === 'S') {
      this.position.direction = 'W';
      return;
    }

    if (this.position.direction === 'W') {
      this.position.direction = 'N';
      return;
    }
  }

  private rotateLeft() {
    if (this.position.direction === 'N') {
      this.position.direction = 'W';
      return;
    }

    if (this.position.direction === 'W') {
      this.position.direction = 'S';
      return;
    }

    if (this.position.direction === 'S') {
      this.position.direction = 'E';
      return;
    }

    if (this.position.direction === 'E') {
      this.position.direction = 'N';
      return;
    }
  }
}
