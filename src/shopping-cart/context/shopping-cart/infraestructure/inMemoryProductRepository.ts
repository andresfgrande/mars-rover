import { Product } from '../domain/product';

export class InMemoryProductRepository {
  private products = new Map<string, Product>();

  getProductById(id: string): Product {
    return this.products.get(id);
  }

  save(product: Product) {
    this.products.set(product.getProductId(), product);
  }
}
