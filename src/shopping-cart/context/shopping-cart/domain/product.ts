interface ProductResponse {
  idProduct: string;
  name: string;
  price: number;
}

interface ProductPrimitives {
  idProduct: string;
  name: string;
  price: number;
}

export class Product {
  constructor(
    private idProduct: string,
    private name: string,
    private price: number,
  ) {}

  static fromPrimitives(productPrimitives: {
    idProduct: string;
    name: string;
    price: number;
  }): Product {
    const product = new Product(
      productPrimitives.idProduct,
      productPrimitives.name,
      productPrimitives.price,
    );
    return product;
  }

  toPrimitives(): ProductPrimitives {
    const content: ProductPrimitives = {
      idProduct: this.idProduct,
      name: this.name,
      price: this.price,
    };

    return content;
  }

  getProductId(): string {
    return this.idProduct;
  }
}
