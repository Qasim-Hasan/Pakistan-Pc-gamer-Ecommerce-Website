import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../../services/productservice.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products';
import { CartItem } from '../../models/cart-item'; // Import the CartItem interface

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css'],
})
export class CartpageComponent implements OnInit {
  cartItems: CartItem[] = []; // Use CartItem interface for cartItems

  constructor(
    private productService: ProductserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const cartItem = this.productService.getProductById(id);
    if (cartItem) {
      this.addToCart(cartItem);
    }
  }

  addToCart(cartItem: Product): void {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === cartItem.id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product: cartItem, quantity: 1 });
    }
  }

  increaseQuantity(item: CartItem): void {
    item.quantity += 1;
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
