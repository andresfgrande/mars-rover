import { ProductAdder } from '../../../src/shopping-cart/context/shopping-cart/services/productAdder.service';
import { ShoppingCart } from '../../../src/shopping-cart/context/shopping-cart/domain/shopping.cart';
import { InMemoryShoppingCartRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryShoppingCartRepository';
import { mock } from 'jest-mock-extended';
import { DateGenerator } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/dateGenerator';
import { InMemoryProductRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryProductRepository';
import {
  Price,
  Product,
  ProductId,
  ProductName,
} from '../../../src/shopping-cart/context/shopping-cart/domain/product';
import { UserId } from '../../../src/shopping-cart/context/shopping-cart/domain/userId';
import { CreationDate } from '../../../src/shopping-cart/context/shopping-cart/domain/creationDate';

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

    shoppingCartRepository.getByUserId.mockReturnValue(
      new ShoppingCart(new UserId('andres'), new CreationDate(expectedDate)),
    );

    productRepository.getProductById.mockReturnValue(
      new Product(
        new ProductId('10002'),
        new ProductName('The Hobbit'),
        new Price(5),
      ),
    );

    productAdder.execute({
      idUser: 'andres',
      idProduct: '10002',
      quantity: 2,
    });

    const expectedShoppingCart: ShoppingCart = ShoppingCart.fromPrimitives({
      creationDate: expectedDate,
      idUser: 'andres',
      items: [
        {
          id: '10002',
          name: 'The Hobbit',
          unitPrice: 5,
          quantity: 2,
          total: 10,
        },
      ],
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
        items: [
          {
            id: '10002',
            name: 'The Hobbit',
            unitPrice: 2,
            quantity: 2,
            total: 4,
          },
        ],
      }),
    );
    productRepository.getProductById.mockReturnValue(
      new Product(
        new ProductId('20110'),
        new ProductName('Breaking Bad'),
        new Price(5),
      ),
    );
    productAdder.execute({
      idUser: 'andres',
      idProduct: '20110',
      quantity: 5,
    });

    const expectedShoppingCart: ShoppingCart = ShoppingCart.fromPrimitives({
      creationDate: expectedDate,
      idUser: 'andres',
      items: [
        {
          id: '10002',
          name: 'The Hobbit',
          unitPrice: 2,
          quantity: 2,
          total: 4,
        },
        {
          id: '20110',
          name: 'Breaking Bad',
          unitPrice: 5,
          quantity: 5,
          total: 25,
        },
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
        items: [
          {
            id: '10002',
            name: 'The Hobbit',
            unitPrice: 2,
            quantity: 2,
            total: 4,
          },
        ],
      }),
    );
    productRepository.getProductById.mockReturnValue(
      new Product(
        new ProductId('10002'),
        new ProductName('The Hobbit'),
        new Price(5),
      ),
    );
    productAdder.execute({
      idUser: 'andres',
      idProduct: '10002',
      quantity: 5,
    });

    const expectedShoppingCart: ShoppingCart = ShoppingCart.fromPrimitives({
      creationDate: expectedDate,
      idUser: 'andres',
      items: [
        {
          id: '10002',
          name: 'The Hobbit',
          unitPrice: 2,
          quantity: 7,
          total: 14,
        },
      ],
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

//add product de producto que ya existe en la shopping cart y se tengan que sumar cantidades --OK
//comprobar que cuando se hace add product que el producto existe, si no existe devolver error --OK
