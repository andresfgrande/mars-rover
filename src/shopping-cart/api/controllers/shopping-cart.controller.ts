import { ProductAdder } from '../../context/shopping-cart/services/ProductAdder.service';
import { ShoppingCartContentCreator } from '../../context/shopping-cart/services/ShoppingCartContentCreator';

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

export interface ContentResponse {
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

export interface ContentRequestDTO {
  idUser: string;
}

export interface ContentRequest {
  idUser: string;
}

export class ShoppingCartController {
  constructor(
    private productAdder: ProductAdder,
    private shoppingCartContentCreator: ShoppingCartContentCreator,
  ) {}

  addProduct(request: AddProductRequestDTO): void {
    this.productAdder.execute(request);
  }

  getContent(request: ContentRequestDTO): ContentResponseDTO {
    return this.shoppingCartContentCreator.execute(request);
  }
}
