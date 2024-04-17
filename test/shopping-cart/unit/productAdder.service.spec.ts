import { ProductAdder } from '../../../src/shopping-cart/context/shopping-cart/services/productAdder.service';
import { ShoppingCart } from '../../../src/shopping-cart/context/shopping-cart/domain/shopping.cart';
import { InMemoryShoppingCartRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryShoppingCartRepository';
import { mock } from 'jest-mock-extended';
import { DateGenerator } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/dateGenerator';
import { InMemoryProductRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryProductRepository';
import { Product } from '../../../src/shopping-cart/context/shopping-cart/domain/product';

describe('ProductAdder', () => {
  it('Should add product', () => {
    const dateGenerator = mock<DateGenerator>();
    const shoppingCartRepository = mock<InMemoryShoppingCartRepository>();
    const productRepository = mock<InMemoryProductRepository>();
    const productAdder = new ProductAdder(
      shoppingCartRepository,
      dateGenerator,
      productRepository,
    );

    const expectedDate = new Date().toISOString();
    dateGenerator.getDate.mockReturnValue(expectedDate);
    productRepository.getProductById.mockReturnValue(
      new Product('10002', 'The Hobbit', 5),
    );

    productAdder.execute({
      idUser: 'andres',
      idProduct: '10002',
      quantity: 2,
    });

    const expectedShoppingCart: ShoppingCart = ShoppingCart.fromPrimitives({
      creationDate: expectedDate,
      idUser: 'andres',
      products: [{ id: '10002', quantity: 2 }],
    });

    expect(shoppingCartRepository.save).toHaveBeenCalledWith(
      expectedShoppingCart,
    );
  });

  it('Should add 1 product to existing shopping cart', () => {
    const dateGenerator = mock<DateGenerator>();
    const shoppingCartRepository = mock<InMemoryShoppingCartRepository>();
    const productRepository = mock<InMemoryProductRepository>();
    const productAdder = new ProductAdder(
      shoppingCartRepository,
      dateGenerator,
      productRepository,
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
    productRepository.getProductById.mockReturnValue(
      new Product('10002', 'The Hobbit', 5),
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

  it('Should sum quantities in case product exists in cart', () => {
    const dateGenerator = mock<DateGenerator>();
    const shoppingCartRepository = mock<InMemoryShoppingCartRepository>();
    const productRepository = mock<InMemoryProductRepository>();
    const productAdder = new ProductAdder(
      shoppingCartRepository,
      dateGenerator,
      productRepository,
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
    productRepository.getProductById.mockReturnValue(
      new Product('10002', 'The Hobbit', 5),
    );
    productAdder.execute({
      idUser: 'andres',
      idProduct: '10002',
      quantity: 5,
    });

    const expectedShoppingCart: ShoppingCart = ShoppingCart.fromPrimitives({
      creationDate: expectedDate,
      idUser: 'andres',
      products: [{ id: '10002', quantity: 7 }],
    });

    expect(shoppingCartRepository.save).toHaveBeenCalledWith(
      expectedShoppingCart,
    );
  });

  it('Should throw error in case product does not exist', () => {
    const dateGenerator = mock<DateGenerator>();
    const shoppingCartRepository = mock<InMemoryShoppingCartRepository>();
    const productRepository = mock<InMemoryProductRepository>();
    const productAdder = new ProductAdder(
      shoppingCartRepository,
      dateGenerator,
      productRepository,
    );
    const expectedDate = new Date().toISOString();
    dateGenerator.getDate.mockReturnValue(expectedDate);
    productRepository.getProductById.mockReturnValue(undefined);
    const productRequest = {
      idUser: 'andres',
      idProduct: '20110',
      quantity: 2,
    };

    expect(() => productAdder.execute(productRequest)).toThrow();
  });
});

//add product de producto que ya existe en la shopping cart y se tengan que sumar cantidades
//comprobar que cuando se hace add product que el producto existe, si no existe devolver error
