// services/productservice.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { CartItem } from '../models/cart-item';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
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
      map((items) =>
        items.map((item) => ({
          id: item.CartItemId,
          productId: item.ProductId,
          quantity: item.Quantity,
          product: {
            id: item.ProductId,
            name: item.ProductName,
            price: item.ProductPrice,
            image_url: item.ProductImageUrl,
            description: item.ProductDescription,
          },
        }))
      )
    );
  }

  clearCart(): Observable<void> {
    return this.http
      .delete<void>(this.api_cartpage, { observe: 'response' })
      .pipe(
        map((response) => {
          if (response.status === 204) {
            // 204 No Content is the expected successful response
            console.log('Cart cleared successfully');
          } else {
            console.warn('Unexpected response status:', response.status);
          }
        }),
        catchError((error) => {
          console.error('Error clearing cart:', error.message, error);
          return throwError('Failed to clear cart; please try again later.');
        })
      );
  }

  getProductId(Id: number): Observable<Product> {
    const url = `${this.api_productpage}${Id}`;
    return this.http.get<Product[]>(url).pipe(
      map((products) => products[0]) // Extract the first product from the array
    );
  }

  updateCartItemQuantity(item: CartItem): Observable<void> {
    const url = `${this.api_cartpage}/${item.id}`;
    return this.http.put<void>(url, item);
  }



  // Define the handleError method
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
