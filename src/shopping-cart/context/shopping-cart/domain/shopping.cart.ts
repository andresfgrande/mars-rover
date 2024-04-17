import { Price, ProductId } from './product';
import { ShoppingCartItems } from './shoppingCartItems';
import { ShoppingCartItem } from './shoppingCartItem';
import { UserId } from './userId';
import { ProductQuantity } from './productQuantity';
import { CreationDate } from './creationDate';

interface ShoppingCartPrimitives {
  creationDate: string;
  idUser: string;
  items: { id: string; unitPrice: number; quantity: number; total: number }[];
}

export class ShoppingCart {
  private creationDate: CreationDate;
  private idUser: UserId;

  private items: ShoppingCartItems;

  constructor(idUser: UserId, creationDate: CreationDate) {
    this.idUser = idUser;
    this.creationDate = creationDate;
    this.items = new ShoppingCartItems();
  }

  static fromPrimitives(
    shoppingCartPrimitives: ShoppingCartPrimitives,
  ): ShoppingCart {
    const shoppingCart = new ShoppingCart(
      new UserId(shoppingCartPrimitives.idUser),
      new CreationDate(shoppingCartPrimitives.creationDate),
    );
    shoppingCart.items = ShoppingCartItems.fromPrimitives(
      shoppingCartPrimitives.items,
    );
    return shoppingCart;
  }

  toPrimitives(): ShoppingCartPrimitives {
    const content: ShoppingCartPrimitives = {
      creationDate: this.creationDate.toString(),
      idUser: this.idUser.toString(),
      items: this.items.toPrimitives(),
    };
    return content;
  }

  addProduct(idProduct: string, unitPrice: number, quantity: number): void {
    this.items.addItem(
      new ShoppingCartItem(
        new ProductId(idProduct),
        new Price(unitPrice),
        new ProductQuantity(quantity),
      ),
    );
  }

  getUserId(): string {
    return this.idUser.toString();
  }
}
