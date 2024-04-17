import { Product, ProductId } from '../domain/product';

export class InMemoryProductRepository {
  private products = new Map<string, Product>();

  getProductById(id: ProductId): Product {
    return this.products.get(id.toString());
  }

  save(product: Product) {
    this.products.set(product.getProductId(), product);
  }
}
