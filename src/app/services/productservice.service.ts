import { Injectable } from '@angular/core';
import { Product } from '../models/products';


@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  private products: Product[] = [
  { id: 1, name: 'RTX 4070', price: 100, image_url: 'https://tpucdn.com/gpu-specs/images/c/3924-front.small.jpg', description: 'High performance graphics card suitable for gaming and creative work.' },
  { id: 2, name: 'Razer Naga Pro', price: 150, image_url: 'https://tpucdn.com/review/razer-naga-v2-pro/images/mainbuttons_small.jpg', description: 'Gaming mouse with customizable buttons and ergonomic design.' },
  { id: 3, name: 'Skyloong Keyboard', price: 200, image_url: 'https://rbtechngames.com/wp-content/uploads/2021/10/image_2021-10-01_190638.png', description: 'Mechanical keyboard with customizable RGB lighting and switches.' },
  { id: 4, name: 'Ryzen 7800X3D', price: 250, image_url: 'https://cdn.mos.cms.futurecdn.net/NG35cjoxuWeJfJpLoWtGB9.jpg', description: 'Powerful CPU with 3D V-Cache for enhanced gaming and productivity.' },
  { id: 5, name: 'RTX 4060', price: 100, image_url: 'https://tpucdn.com/gpu-specs/images/c/3924-front.small.jpg', description: 'Mid-range graphics card offering good performance for most games.' },
  { id: 6, name: 'Razer Naga Essential', price: 150, image_url: 'https://tpucdn.com/review/razer-naga-v2-pro/images/mainbuttons_small.jpg', description: 'Gaming mouse with essential features and programmable buttons.' },
  { id: 7, name: 'Skyloong Keyboard', price: 200, image_url: 'https://rbtechngames.com/wp-content/uploads/2021/10/image_2021-10-01_190638.png', description: 'Mechanical keyboard with customizable RGB lighting and switches.' },
  { id: 8, name: 'Ryzen 7800X3D', price: 250, image_url: 'https://cdn.mos.cms.futurecdn.net/NG35cjoxuWeJfJpLoWtGB9.jpg', description: 'Powerful CPU with 3D V-Cache for enhanced gaming and productivity.' }
];

  constructor() {}
// Return the product List
  getAllProducts(): Product[] {
    return this.products;
  }
// Return a Id of a product
  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }


}
