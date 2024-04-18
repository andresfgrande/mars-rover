import {
  ContentRequest,
  ContentResponse,
} from '../../../api/controllers/shoppingCart.controller';
import { InMemoryShoppingCartRepository } from '../infrastructure/inMemoryShoppingCartRepository';
import { InMemoryProductRepository } from '../infrastructure/inMemoryProductRepository';
import { ProductId } from '../domain/product';
import { UserId } from '../domain/userId';

export class ShoppingCartContentCreator {
  constructor(
    private shoppingCartRepository: InMemoryShoppingCartRepository,
    private productRepository: InMemoryProductRepository,
  ) {}

  execute(request: ContentRequest): ContentResponse {
    const shoppingCart = this.shoppingCartRepository.getByUserId(
      new UserId(request.idUser),
    );

    const shoppingCartContent = shoppingCart.toPrimitives();

    const products = shoppingCartContent.items;

    const orders = products.map((item: { id: string; quantity: number }) => {
      const currentProduct = this.productRepository.getProductById(
        new ProductId(item.id),
      );
      const currentProductPrimitives = currentProduct.toPrimitives();
      return {
        idProduct: currentProductPrimitives.idProduct,
        name: currentProductPrimitives.name,
        unitPrice: currentProductPrimitives.price,
        total: item.quantity * currentProductPrimitives.price,
        quantity: item.quantity,
      };
    });

    const totalPrice = shoppingCart.getCartTotal();

    const response = {
      creationDate: shoppingCartContent.creationDate,
      orders: orders,
      totalPrice: totalPrice,
    };

    return response;
  }
}
