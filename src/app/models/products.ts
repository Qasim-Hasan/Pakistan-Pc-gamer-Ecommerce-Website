// models/products.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string; // Use image_url to match the API response
  description: string;
}
