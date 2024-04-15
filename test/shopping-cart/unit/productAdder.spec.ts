import { ProductAdder } from '../../../src/shopping-cart/context/shopping-cart/services/ProductAdder.service';
import { ShoppingCart } from '../../../src/shopping-cart/context/shopping-cart/domain/shopping.cart';
import { InMemoryShoppingCartRepository } from '../../../src/shopping-cart/context/shopping-cart/infraestructure/in-memory-shopping-cart.repository';
import { mock } from 'jest-mock-extended';
import { DateGenerator } from '../../../src/shopping-cart/context/shopping-cart/infraestructure/dateGenerator';

describe('ProductAdder', () => {
  it('Should add product', () => {
    const dateGenerator = mock<DateGenerator>();
    const shoppingCartRepository = mock<InMemoryShoppingCartRepository>();
    const productAdder = new ProductAdder(
      shoppingCartRepository,
      dateGenerator,
    );

    const expectedDate = new Date().toISOString();
    dateGenerator.getDate.mockReturnValue(expectedDate);

    productAdder.execute({
      idUser: 'andres',
      idProduct: 'the-hobbit',
      quantity: 2,
    });

    const expectedShoppingCart: ShoppingCart = ShoppingCart.fromPrimitives({
      creationDate: expectedDate,
      idUser: 'andres',
      products: [{ id: 'the-hobbit', quantity: 2 }],
    });

    expect(shoppingCartRepository.save).toHaveBeenCalledWith(
      expectedShoppingCart,
    );
  });

  it('Should add 1 product to existing shopping cart', () => {
    /**
     *
     * Given I add 2 units of "The Hobbit" to my shopping basket
     * And I add 5 units of "Breaking Bad"
     * When I check the content of my shopping basket
     * Then it should contain the following information:
     * - Creation date : 01/03/2021
     * - 2 x The Hobbit   // 2 x 5.00 = €10.00
     * - 5 x Breaking Bad // 5 x 7.00 = €35.00
     * - Total: €45.00
     * ```
     * Products available (in-memory repository):
     * - Books
     *    - 10001: Lord of the Rings - €10.00
     *    - 10002: The Hobbit - €5.00
     * - DVDs
     *    - 20001: Game of Thrones - €9.00
     *    - 20110: Breaking Bad - €7.00
     */

    const dateGenerator = mock<DateGenerator>();
    const shoppingCartRepository = mock<InMemoryShoppingCartRepository>();
    const productAdder = new ProductAdder(
      shoppingCartRepository,
      dateGenerator,
    );

    const expectedDate = new Date().toISOString();
    dateGenerator.getDate.mockReturnValue(expectedDate);

    shoppingCartRepository.getByUserId.mockReturnValue(
      ShoppingCart.fromPrimitives({
        creationDate: expectedDate,
        idUser: 'andres',
        products: [{ id: '10002', quantity: 2 }],
      }),
    );

    productAdder.execute({
      idUser: 'andres',
      idProduct: '20110',
      quantity: 5,
    });

    const expectedShoppingCart: ShoppingCart = ShoppingCart.fromPrimitives({
      creationDate: expectedDate,
      idUser: 'andres',
      products: [
        { id: '10002', quantity: 2 },
        { id: '20110', quantity: 5 },
      ],
    });

    expect(shoppingCartRepository.save).toHaveBeenCalledWith(
      expectedShoppingCart,
    );
  });
});
