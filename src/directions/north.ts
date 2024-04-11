import { Direction } from './directions';
import { West } from './west';
import { East } from './east';

export class North implements Direction {
  readonly cardinalPoint = 'N';

  rotateLeft(): Direction {
    return new West();
  }

  rotateRight(): Direction {
    return new East();
  }
}
