import { Drink } from './interfaces/drink';

export class Coffee implements Drink {
  readonly name: string = 'Coffee';
  readonly price: number = 10;

  printPrice(): number {
    return this.price;
  }

  printName(): string {
    return this.name;
  }
}
