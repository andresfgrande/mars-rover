import { InMemoryShoppingCartRepository } from '../infrastructure/inMemoryShoppingCartRepository';
import { DateGenerator } from '../infrastructure/dateGenerator';
import { ShoppingCart } from '../domain/shopping.cart';
import { InMemoryProductRepository } from '../infrastructure/inMemoryProductRepository';
import { ProductId } from '../domain/product';
import { UserId } from '../domain/userId';
import { CreationDate } from '../domain/creationDate';

export interface AddProductAdderRequest {
  idUser: string;
  quantity: number;
  idProduct: string;
}

export class ProductAdder {
  constructor(
    private shoppingCartRepository: InMemoryShoppingCartRepository,
    private dateGenerator: DateGenerator,
    private productRepository: InMemoryProductRepository,
  ) {}

  execute(addProductRequest: AddProductAdderRequest) {
    let currentShoppingCart = this.shoppingCartRepository.getByUserId(
      new UserId(addProductRequest.idUser),
    );

    const product = this.productRepository.getProductById(
      new ProductId(addProductRequest.idProduct),
    );
    if (!product) {
      throw new Error('product does not exist');
    }

    if (!currentShoppingCart) {
      currentShoppingCart = new ShoppingCart(
        new UserId(addProductRequest.idUser),
        new CreationDate(this.dateGenerator.getDate()),
      );
    }

    currentShoppingCart.addProduct(
      addProductRequest.idProduct,
      product.toPrimitives().price,
      addProductRequest.quantity,
    );
    this.shoppingCartRepository.save(currentShoppingCart);
  }
}
