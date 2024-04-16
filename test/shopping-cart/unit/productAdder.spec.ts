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

    //expect(productAdder.execute({})).rejects.toThrowError('error text')
  });
});

//add product de producto que ya existe en la shopping cart y se tengan que sumar cantidades
//comprobar que cuando se hace add product que el producto existe
