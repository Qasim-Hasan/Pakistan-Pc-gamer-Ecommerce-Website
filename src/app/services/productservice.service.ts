import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { CartItem } from '../models/cart-item'; // Import CartItem interface
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  // Define API endpoints based on environment variables
  private api_homepage = environment.apiUrl + '/homepage';
  private api_productpage = environment.apiUrl + '/productpage';
  private api_cartpage = environment.apiUrl + '/cartpage';

  // Inject HttpClient to make HTTP requests
  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of products from the homepage API endpoint.
   * @returns An Observable of Product array.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api_homepage);
  }

  /**
   * Adds a product to the cart by sending a POST request to the cart API endpoint.
   * @param product The product to be added to the cart.
   * @returns An Observable of the added Product.
   */
  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api_cartpage, product);
  }

  /**
   * Retrieves all cart items from the cart API endpoint and maps them to CartItem objects.
   * Assumes the backend returns an array of Products.
   * Each Product is transformed into a CartItem with an initial quantity of 1.
   * @returns An Observable of CartItem array.
   */
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<Product[]>(this.api_cartpage).pipe(
      map(products => products.map(product => ({
        product: product,
        quantity: 1 // Initialize quantity or use another default logic
      })))
    );
  }

  /**
   * Fetches a single product by its ID from the product API endpoint.
   * @param productId The ID of the product to fetch.
   * @returns An Observable of the Product.
   */
  getProductId(productId: number): Observable<Product> {
    const url = `${this.api_productpage}?id=${productId}`;
    return this.http.get<Product>(url);
  }
}
