export class ShoppingCart {
  private idUser: string;
  private products: {
    id: string;
    quantity: number;
  }[] = [];

  constructor(idUser: string) {
    this.idUser = idUser;
  }

  static fromPrimitives(shoppingCartPrimitives: {
    idUser: string;
    products: { id: string; quantity: number }[];
  }): ShoppingCart {
    const shoppingCart = new ShoppingCart(shoppingCartPrimitives.idUser);

    shoppingCart.products = shoppingCartPrimitives.products.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    return shoppingCart;
  }

  addProduct(idProduct: string, quantity: number): void {
    this.products.push({ id: idProduct, quantity: quantity });
  }
}
