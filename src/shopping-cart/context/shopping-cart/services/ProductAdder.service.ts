import { InMemoryShoppingCartRepository } from '../infraestructure/in-memory-shopping-cart.repository';
import { ShoppingCart } from '../domain/shopping.cart';

export interface AddProductAdderRequest {
  idUser: string;
  quantity: number;
  idProduct: string;
}

export class ProductAdder {
  constructor(private shoppingCartRepository: InMemoryShoppingCartRepository) {}

  execute(addProductRequest: {
    idUser: string;
    quantity: number;
    idProduct: string;
  }) {
    const shoppingCart = new ShoppingCart(addProductRequest.idUser);
    shoppingCart.addProduct(
      addProductRequest.idProduct,
      addProductRequest.quantity,
    );
    this.shoppingCartRepository.save(shoppingCart);
  }
}
