import { InMemoryShoppingCartRepository } from '../infraestructure/in-memory-shopping-cart.repository';
import { DateGenerator } from '../infraestructure/dateGenerator';
import { ShoppingCart } from '../domain/shopping.cart';

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
    let currentShoppingCart = this.shoppingCartRepository.getByUserId(
      addProductRequest.idUser,
    );
    //Get product y checks (si product existe en la tienda)
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
