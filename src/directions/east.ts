import { Direction } from './directions';
import { North } from './north';
import { South } from './south';

export class East implements Direction {
  readonly cardinalPoint = 'E';

  rotateLeft(): Direction {
    return new North();
  }

  rotateRight(): Direction {
    return new South();
  }
}
