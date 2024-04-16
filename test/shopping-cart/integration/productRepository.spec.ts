import { InMemoryProductRepository } from '../../../src/shopping-cart/context/shopping-cart/infraestructure/inMemoryProductRepository';
import { Product } from '../../../src/shopping-cart/context/shopping-cart/domain/product';

describe('Product Repository', () => {
  it('Should be able to save a new product', async () => {
    //save and get the product

    const productRepository = new InMemoryProductRepository();
    const idProduct = '123';
    const name = 'Test';
    const price = 11;
    const newProduct = new Product(idProduct, name, price);

    productRepository.save(newProduct);

    const savedProduct = productRepository.getProductById(idProduct);

    expect(savedProduct).toStrictEqual(newProduct);
  });
});
