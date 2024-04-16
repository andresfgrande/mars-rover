import {
  ContentRequestDTO,
  ContentResponseDTO,
  ShoppingCartController,
} from '../../../src/shopping-cart/api/controllers/shopping-cart.controller';
import { ProductAdder } from '../../../src/shopping-cart/context/shopping-cart/services/ProductAdder.service';
import { InMemoryShoppingCartRepository } from '../../../src/shopping-cart/context/shopping-cart/infraestructure/in-memory-shopping-cart.repository';
import { DateGenerator } from '../../../src/shopping-cart/context/shopping-cart/infraestructure/dateGenerator';
import { ShoppingCartContentCreator } from '../../../src/shopping-cart/context/shopping-cart/services/ShoppingCartContentCreator';
import { InMemoryProductRepository } from '../../../src/shopping-cart/context/shopping-cart/infraestructure/inMemoryProductRepository';
import { Product } from '../../../src/shopping-cart/context/shopping-cart/domain/product';

describe('ShoppingCart should', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('be created', () => {
    const fixedTimestamp = 1713256115000;
    jest.setSystemTime(fixedTimestamp);

    const dateGenerator = new DateGenerator();
    const shoppingCartRepository = new InMemoryShoppingCartRepository();
    const productRepository = new InMemoryProductRepository();
    const newProduct = new Product('10002', 'The Hobbit', 5);
    productRepository.save(newProduct);

    const productAdder = new ProductAdder(
      shoppingCartRepository,
      dateGenerator,
    );
    const shoppingCartContentCreator = new ShoppingCartContentCreator(
      shoppingCartRepository,
      productRepository,
    );
    const shoppingCartController = new ShoppingCartController(
      productAdder,
      shoppingCartContentCreator,
    );
    const idUser = 'andres';
    const idProduct = '10002';
    const quantity = 2;

    shoppingCartController.addProduct({ idUser, idProduct, quantity });

    const expectedShoppingCart = {
      creationDate: new Date().toISOString(),
      orders: [
        {
          idProduct: '10002',
          name: 'The Hobbit',
          unitPrice: 5,
          total: 10,
          quantity: 2,
        },
      ],
      totalPrice: 10,
    } as ContentResponseDTO;

    const shoppingCartContentRequest: ContentRequestDTO = {
      idUser: 'andres',
    };

    expect(
      shoppingCartController.getContent(shoppingCartContentRequest),
    ).toStrictEqual(expectedShoppingCart);
  });
});

//Crear test integracion para date generator y repository -- OK
//Crear servicio para obtener contenido y poner en verde este test --OK
