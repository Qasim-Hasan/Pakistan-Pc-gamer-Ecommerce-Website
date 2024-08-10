// services/productservice.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { CartItem } from '../models/cart-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  private api_homepage = environment.apiUrl + 'api/product/homepage';
  private api_productpage = environment.apiUrl + 'api/product/productpage/';
  private api_cartpage = environment.apiUrl + 'api/Cart/cartpage';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api_homepage);
  }

  addToCart(product: Product): Observable<void> {
    return this.http.post<void>(this.api_cartpage, product);
  }

   /**
   * Fetches all cart items from the cart API endpoint and maps them to CartItem objects.
   * @returns An Observable of CartItem array.
   */
   getCartItems(): Observable<CartItem[]> {
    return this.http.get<any[]>(this.api_cartpage).pipe(
      map(items => items.map(item => ({
        id: item.CartItemId,
        productId: item.ProductId,
        quantity: item.Quantity,
        product: {
          id: item.ProductId,
          name: item.ProductName,
          price: item.ProductPrice,
          image_url: item.ProductImageUrl,
          description: item.ProductDescription
        }
      })))
    );
  }

  updateCartItemQuantity(id: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.api_cartpage}/Cart/updateQuantity/${id}`, { quantity });
  }

  clearCart(): Observable<any> {
    return this.http.delete<any>(`${this.api_cartpage}/Cart/clear`);
  }

  getProductId(Id: number): Observable<Product> {
    const url = `${this.api_productpage}${Id}`;
    return this.http.get<Product[]>(url).pipe(
      map(products => products[0]) // Extract the first product from the array
    );
  }
}
