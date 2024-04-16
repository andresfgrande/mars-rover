import {
  ContentRequest,
  ContentResponse,
} from '../../../api/controllers/shopping-cart.controller';
import { InMemoryShoppingCartRepository } from '../infraestructure/in-memory-shopping-cart.repository';
import { InMemoryProductRepository } from '../infraestructure/inMemoryProductRepository';

export class ShoppingCartContentCreator {
  constructor(
    private shoppingCartRepository: InMemoryShoppingCartRepository,
    private productRepository: InMemoryProductRepository,
  ) {}

  execute(request: ContentRequest): ContentResponse {
    const shoppingCart = this.shoppingCartRepository.getByUserId(
      request.idUser,
    );

    const shoppingCartContent = shoppingCart.toPrimitives();

    const products = shoppingCartContent.products;

    const orders = products.map((item: { id: string; quantity: number }) => {
      const currentProduct = this.productRepository.getProductById(item.id);
      const currentProductPrimitives = currentProduct.toPrimitives();
      return {
        idProduct: currentProductPrimitives.idProduct,
        name: currentProductPrimitives.name,
        unitPrice: currentProductPrimitives.price,
        total: item.quantity * currentProductPrimitives.price,
        quantity: item.quantity,
      };
    });

    let totalPrice = 0;
    orders.forEach((item) => {
      totalPrice += item.quantity * item.unitPrice;
    });

    const response = {
      creationDate: shoppingCartContent.creationDate,
      orders: orders,
      totalPrice: totalPrice,
    };

    return response;
  }
}
