import { InMemoryShoppingCartRepository } from '../../../src/shopping-cart/context/shopping-cart/infraestructure/in-memory-shopping-cart.repository';
import { DateGenerator } from '../../../src/shopping-cart/context/shopping-cart/infraestructure/dateGenerator';
import { ShoppingCart } from '../../../src/shopping-cart/context/shopping-cart/domain/shopping.cart';

describe('Shopping Cart Repository should', () => {
  it('be able to save a new shopping cart when repo has no products', () => {
    const shoppingCartRepository = new InMemoryShoppingCartRepository();
    const dateGenerator = new DateGenerator();
    const idUser = 'andres';
    const creationDate = dateGenerator.getDate();
    const shoppingCart = new ShoppingCart(idUser, creationDate);
    shoppingCart.addProduct('10002', 5);

    shoppingCartRepository.save(shoppingCart);
    const savedShoppingCart = shoppingCartRepository.getByUserId(idUser);

    expect(shoppingCart).toStrictEqual(savedShoppingCart);
  });
});
