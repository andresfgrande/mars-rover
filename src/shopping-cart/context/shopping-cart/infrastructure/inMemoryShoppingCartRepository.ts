import { ShoppingCart } from '../domain/shopping.cart';

export class InMemoryShoppingCartRepository {
  private carts = new Map<string, ShoppingCart>();

  getByUserId(id: string): ShoppingCart {
    return this.carts.get(id);
  }

  save(shoppingCart: ShoppingCart): void {
    this.carts.set(shoppingCart.getUserId(), shoppingCart);
  }
}
