import { InMemoryShoppingCartRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryShoppingCartRepository';
import { DateGenerator } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/dateGenerator';
import {
  CreationDate,
  ShoppingCart,
  UserId,
} from '../../../src/shopping-cart/context/shopping-cart/domain/shopping.cart';

describe('Shopping Cart Repository should', () => {
  it('be able to save a new shopping cart when repo has no products', () => {
    const shoppingCartRepository = new InMemoryShoppingCartRepository();
    const dateGenerator = new DateGenerator();
    const idUser = 'andres';
    const creationDate = dateGenerator.getDate();
    const shoppingCart = new ShoppingCart(
      new UserId(idUser),
      new CreationDate(creationDate),
    );
    shoppingCart.addProduct('10002', 5);

    shoppingCartRepository.save(shoppingCart);
    const savedShoppingCart = shoppingCartRepository.getByUserId(idUser);

    expect(shoppingCart).toStrictEqual(savedShoppingCart);
  });
});
