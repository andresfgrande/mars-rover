import { Direction } from './directions';
import { East } from './east';
import { West } from './west';

export class South implements Direction {
  readonly cardinalPoint = 'S';

  rotateLeft(): Direction {
    return new East();
  }

  rotateRight(): Direction {
    return new West();
  }
}
