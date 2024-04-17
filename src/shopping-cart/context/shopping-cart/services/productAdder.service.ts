import { InMemoryShoppingCartRepository } from '../infrastructure/inMemoryShoppingCartRepository';
import { DateGenerator } from '../infrastructure/dateGenerator';
import { ShoppingCart } from '../domain/shopping.cart';
import { InMemoryProductRepository } from '../infrastructure/inMemoryProductRepository';

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

  execute(addProductRequest: {
    idUser: string;
    quantity: number;
    idProduct: string;
  }) {
    let currentShoppingCart = this.shoppingCartRepository.getByUserId(
      addProductRequest.idUser,
    );

    //Get product y checks (si product existe en la tienda)
    const product = this.productRepository.getProductById(
      addProductRequest.idProduct,
    );
    if (!product) {
      throw new Error('product does not exist');
    }

    if (!currentShoppingCart) {
      currentShoppingCart = new ShoppingCart(
        addProductRequest.idUser,
        this.dateGenerator.getDate(),
      );
    }

    currentShoppingCart.addProduct(
      addProductRequest.idProduct,
      addProductRequest.quantity,
    );
    this.shoppingCartRepository.save(currentShoppingCart);
  }
}
