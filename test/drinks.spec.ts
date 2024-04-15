import { Coffee } from '../src/drinks/coffee';
import { Tea } from '../src/drinks/tea';
import { Milk } from '../src/drinks/milk';
import { Sugar } from '../src/drinks/sugar';

describe('Drinks should', () => {
  it('be able to show the price', () => {
    const coffee = new Coffee();
    const tea = new Tea();
    expect(coffee.printPrice()).toEqual(10);
    expect(tea.printPrice()).toEqual(8);
  });

  it('be able to show the name', () => {
    const coffee = new Coffee();
    const tea = new Tea();
    expect(coffee.printName()).toEqual('Coffee');
    expect(tea.printName()).toEqual('Tea');
  });

  it('mix a drink with a complement', () => {
    const coffee = new Coffee();
    const milk: Milk = new Milk(coffee);

    expect(milk.printName()).toEqual('Coffee with milk');
    expect(milk.printPrice()).toEqual(12);
  });

  it('mix a drink with 2 complements', () => {
    const tea = new Tea();
    const milkTea: Milk = new Milk(tea);
    const sugar: Sugar = new Sugar(milkTea);

    expect(sugar.printName()).toEqual('Tea with milk and sugar');
    expect(sugar.printPrice()).toEqual(11);

    const newTea = new Tea();
    const sugarTea: Sugar = new Sugar(newTea);
    const milk: Milk = new Milk(sugarTea);

    expect(milk.printName()).toEqual('Tea and sugar with milk');
    expect(milk.printPrice()).toEqual(11);
  });
});
