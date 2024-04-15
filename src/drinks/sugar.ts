import { Drink } from './interfaces/drink';

export class Sugar implements Drink {
  readonly name: string = 'sugar';
  readonly price: number = 1;

  constructor(private drink: Drink) {}

  printName(): string {
    return this.drink.printName() + ' and ' + this.name;
  }

  printPrice(): number {
    return this.drink.printPrice() + this.price;
  }
}
