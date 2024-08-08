// models/cart-item.ts
import { Product } from './products'; // Adjust the path as necessary

export interface CartItem {
  product: Product;
  quantity: number;
}
