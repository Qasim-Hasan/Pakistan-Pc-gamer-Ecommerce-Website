export class Product {
  id: number = 0;
  name: string = '';
  price: number = 0;
  image_url: string = '';
  description: string = '';
}

export interface CartItem {
  product: Product;
  quantity: number;
}
