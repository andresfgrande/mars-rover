import { ProductAdder } from '../../context/shopping-cart/services/ProductAdder.service';

export interface ContentResponseDTO {
  creationDate: string;
  orders: {
    idProduct: string;
    name: string;
    unitPrice: number;
    total: number;
    quantity: number;
  }[];
  totalPrice: number;
}

export interface AddProductRequestDTO {
  idUser: string;
  idProduct: string;
  quantity: number;
}

export class ShoppingCartController {
  constructor(private productAdder: ProductAdder) {}

  addProduct(request: AddProductRequestDTO): void {
    //
  }

  getContent(): ContentResponseDTO {
    return undefined;
  }
}
