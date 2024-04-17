//Class Collections
import { Price, ProductId } from './product';

import { ProductQuantity } from './productQuantity';

export class ShoppingCartItem {
  constructor(
    private id: ProductId,
    private unitPrice: Price,
    private quantity: ProductQuantity,
  ) {}

  getQuantity(): ProductQuantity {
    return this.quantity;
  }

  getTotal(): number {
    return this.quantity.value() * this.unitPrice.toNumber();
  }

  getProductId(): ProductId {
    return this.id;
  }

  addQuantity(quantity: ProductQuantity): void {
    this.quantity = this.quantity.addQuantity(quantity);
  }

  toPrimitives(): {
    id: string;
    unitPrice: number;
    quantity: number;
    total: number;
  } {
    return {
      id: this.getProductId().toString(),
      unitPrice: this.unitPrice.toNumber(),
      quantity: this.getQuantity().value(),
      total: this.getTotal(),
    };
  }
}
