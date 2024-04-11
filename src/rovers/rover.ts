export interface Rover {
  moveForward(): void;

  rotateLeft(): void;

  rotateRight(): void;

  getPosition(): string;
}
