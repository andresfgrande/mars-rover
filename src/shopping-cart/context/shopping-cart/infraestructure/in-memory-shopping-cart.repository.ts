import { ShoppingCart } from '../domain/shopping.cart';

export class InMemoryShoppingCartRepository {
  getByUserId(): ShoppingCart {
    return;
  }

  save(shoppingCart: ShoppingCart): void {
    //
  }
}
