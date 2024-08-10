// cartpage.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../../services/productservice.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products';
import { CartItem } from '../../models/cart-item';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css'],
})
export class CartpageComponent implements OnInit {
  cartItems: CartItem[] = [];
  product: Product | undefined;

  constructor(
    private productService: ProductserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductId(id).subscribe(
        (product: Product) => {
          if (product) {
            this.product = product;
            this.addToCart(product);
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching product:', error.message);
        }
      );
    }
  }

  loadCartItems(): void {
    this.productService.getCartItems().subscribe(
      (items: CartItem[]) => {
        this.cartItems = items;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching cart items:', error.message);
      }
    );
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product).subscribe(
      (response: any) => {
        console.log('Product added to cart:', response);
        this.loadCartItems(); // Reload cart items to reflect the newly added product
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding product to cart:', error.message);
      }
    );
  }

  clearCart(): void {
    this.productService.clearCart().subscribe(
      () => {
        console.log('Cart cleared successfully');
        this.loadCartItems(); // Reload cart items to reflect the cleared cart
      },
      (error: HttpErrorResponse) => {
        console.error('Error clearing cart:', error.message);
      }
    );
  }


  increaseQuantity(item: CartItem): void {
    item.quantity += 1;
    this.productService.updateCartItemQuantity(item).subscribe(
      () => {
        console.log('Quantity updated');
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating quantity:', error.message);
      }
    );
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.productService.updateCartItemQuantity(item).subscribe(
        () => {
          console.log('Quantity updated');
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating quantity:', error.message);
        }
      );
    }
  }



}
