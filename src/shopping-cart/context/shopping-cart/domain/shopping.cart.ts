interface ShoppingCartPrimitives {
  creationDate: string;
  idUser: string;
  products: { id: string; quantity: number }[];
}

export class ShoppingCart {
  private creationDate: string;
  private idUser: string;
  private products: {
    id: string;
    quantity: number;
  }[] = [];

  constructor(idUser: string, creationDate: string) {
    this.idUser = idUser;
    this.creationDate = creationDate;
  }

  static fromPrimitives(
    shoppingCartPrimitives: ShoppingCartPrimitives,
  ): ShoppingCart {
    const shoppingCart = new ShoppingCart(
      shoppingCartPrimitives.idUser,
      shoppingCartPrimitives.creationDate,
    );

    shoppingCart.products = shoppingCartPrimitives.products.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    return shoppingCart;
  }

  toPrimitives(): ShoppingCartPrimitives {
    const content: ShoppingCartPrimitives = {
      creationDate: this.creationDate,
      idUser: this.idUser,
      products: this.products,
    };
    return content;
  }

  addProduct(idProduct: string, quantity: number): void {
    this.products.push({ id: idProduct, quantity: quantity });
  }

  getUserId(): string {
    return this.idUser;
  }
}
