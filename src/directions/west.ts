import { Direction } from './directions';
import { South } from './south';
import { North } from './north';

export class West implements Direction {
  readonly cardinalPoint = 'W';

  rotateLeft(): Direction {
    return new South();
  }

  rotateRight(): Direction {
    return new North();
  }
}
