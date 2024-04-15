import { ProductAdder } from '../../../src/shopping-cart/context/shopping-cart/services/ProductAdder.service';
import { ShoppingCart } from '../../../src/shopping-cart/context/shopping-cart/domain/shopping.cart';
import { InMemoryShoppingCartRepository } from '../../../src/shopping-cart/context/shopping-cart/infraestructure/in-memory-shopping-cart.repository';
import { mock } from 'jest-mock-extended';

describe('ProductAdder', () => {
  it('Should add product', () => {
    const shoppingCartRepository = mock<InMemoryShoppingCartRepository>();
    const productAdder = new ProductAdder(shoppingCartRepository);

    productAdder.execute({
      idUser: 'andres',
      idProduct: 'the-hobbit',
      quantity: 2,
    });

    const expectedShoppingCart: ShoppingCart = ShoppingCart.fromPrimitives({
      idUser: 'andres',
      products: [{ id: 'the-hobbit', quantity: 2 }],
    });

    expect(shoppingCartRepository.save).toHaveBeenCalledWith(
      expectedShoppingCart,
    );
  });
});
