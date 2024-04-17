import { ShoppingCart, UserId } from '../domain/shopping.cart';

export class InMemoryShoppingCartRepository {
  private carts = new Map<string, ShoppingCart>();

  getByUserId(id: UserId): ShoppingCart {
    return this.carts.get(id.toString());
  }

  save(shoppingCart: ShoppingCart): void {
    this.carts.set(shoppingCart.getUserId(), shoppingCart);
  }
}
