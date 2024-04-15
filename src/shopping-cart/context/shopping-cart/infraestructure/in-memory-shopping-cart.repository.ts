import { ShoppingCart } from '../domain/shopping.cart';

export class InMemoryShoppingCartRepository {
  getByUserId(id: string): ShoppingCart {
    return;
  }

  save(shoppingCart: ShoppingCart): void {
    //
  }
}
