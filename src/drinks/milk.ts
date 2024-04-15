import { Drink } from './interfaces/drink';

export class Milk implements Drink {
  readonly name: string = 'milk';
  readonly price: number = 2;

  constructor(private drink: Drink) {}

  printName(): string {
    const drinkName = this.drink.printName();

    return drinkName + ' with ' + this.name;
  }

  printPrice(): number {
    return this.drink.printPrice() + this.price;
  }
}
