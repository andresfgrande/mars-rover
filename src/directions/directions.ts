export type CardinalPoint = 'N' | 'S' | 'W' | 'E';

export interface Direction {
  readonly cardinalPoint: CardinalPoint;

  rotateRight(): Direction;

  rotateLeft(): Direction;
}

/*class Direction {
  rotateRight(): Direction {}

  rotateLeft(): Direction {}
}*/
