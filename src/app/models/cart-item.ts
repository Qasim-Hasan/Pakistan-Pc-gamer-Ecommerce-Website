// models/cart-item.ts
import { Product } from './products'; // Adjust the path as necessary

export interface CartItem {
  id: number; // Unique identifier for the cart item
  productId: number; // ID of the product associated with this cart item
  quantity: number; // Quantity of the product in the cart
  product: Product; // Product details
}
