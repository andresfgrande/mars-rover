import { ProductId } from './product';

interface ShoppingCartPrimitives {
  creationDate: string;
  idUser: string;
  products: { id: string; quantity: number }[];
}

//Wrap primitives and strings
export class UserId {
  constructor(private id: string) {}

  toString(): string {
    return this.id;
  }
}

export class ProductQuantity {
  constructor(private quantity: number) {}

  addQuantity(quantity: number): ProductQuantity {
    return new ProductQuantity(this.quantity + quantity);
  }

  getQuantity(): number {
    return this.quantity;
  }
}

export class CreationDate {
  constructor(private date: string) {}

  toString(): string {
    return this.date;
  }
}

//Class Collections

export class ShoppingCart {
  private creationDate: CreationDate;
  private idUser: UserId;
  private products: {
    id: ProductId;
    quantity: ProductQuantity;
  }[] = [];

  constructor(idUser: UserId, creationDate: CreationDate) {
    this.idUser = idUser;
    this.creationDate = creationDate;
  }

  static fromPrimitives(
    shoppingCartPrimitives: ShoppingCartPrimitives,
  ): ShoppingCart {
    const shoppingCart = new ShoppingCart(
      new UserId(shoppingCartPrimitives.idUser),
      new CreationDate(shoppingCartPrimitives.creationDate),
    );

    shoppingCart.products = shoppingCartPrimitives.products.map((item) => {
      return {
        id: new ProductId(item.id),
        quantity: new ProductQuantity(item.quantity),
      };
    });
    return shoppingCart;
  }

  toPrimitives(): ShoppingCartPrimitives {
    const primitiveProducts = this.products.map((item) => {
      return { id: item.id.toString(), quantity: item.quantity.getQuantity() };
    });
    const content: ShoppingCartPrimitives = {
      creationDate: this.creationDate.toString(),
      idUser: this.idUser.toString(),
      products: primitiveProducts,
    };
    return content;
  }

  addProduct(idProduct: string, quantity: number): void {
    const existingItem = this.products.find(
      (item) => item.id.toString() === idProduct,
    );

    if (existingItem) {
      const newProductQuantity = existingItem.quantity.addQuantity(quantity);
      existingItem.quantity = newProductQuantity;
      return;
    }
    this.products.push({
      id: new ProductId(idProduct),
      quantity: new ProductQuantity(quantity),
    });
  }

  getUserId(): string {
    return this.idUser.toString();
  }
}
