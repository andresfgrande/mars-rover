import { InMemoryShoppingCartRepository } from '../infraestructure/in-memory-shopping-cart.repository';
import { ShoppingCart } from '../domain/shopping.cart';
import { DateGenerator } from '../infraestructure/dateGenerator';

export interface AddProductAdderRequest {
  idUser: string;
  quantity: number;
  idProduct: string;
}

export class ProductAdder {
  constructor(
    private shoppingCartRepository: InMemoryShoppingCartRepository,
    private dateGenerator: DateGenerator,
  ) {}

  execute(addProductRequest: {
    idUser: string;
    quantity: number;
    idProduct: string;
  }) {
    const shoppingCart = new ShoppingCart(
      addProductRequest.idUser,
      this.dateGenerator.getDate(),
    );
    shoppingCart.addProduct(
      addProductRequest.idProduct,
      addProductRequest.quantity,
    );
    this.shoppingCartRepository.save(shoppingCart);
  }
}
