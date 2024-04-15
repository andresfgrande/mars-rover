import { Drink } from './interfaces/drink';

export class Tea implements Drink {
  readonly name: string = 'Tea';
  readonly price: number = 8;

  printPrice(): number {
    return this.price;
  }

  printName(): string {
    return this.name;
  }
}
