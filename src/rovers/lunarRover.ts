export class LunarRover {
  constructor(private positionX: number, private positionY: number) {}

  moveForward() {
    this.positionY += 1;
  }

  moveLeft() {
    this.positionX -= 1;
  }

  moveRight() {
    this.positionX += 1;
  }

  moveBack() {
    this.positionY -= 1;
  }

  getPosition() {
    return [this.positionX, this.positionY];
  }
}
