import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../../services/productservice.service'; // Adjust path as needed
import { Product } from '../../models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductserviceService,
    private router: Router // Inject Router for navigation
  ) {}

  //Display all product by calling it from the service
  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }

  // Viewing a product by sending is id to the product page
  viewProduct(id: number): void {
    this.router.navigate(['/productpage', id]); // Use the Router to navigate
  }
  // Add to cart by sending its id to a cart page
  addtoCart(id: number): void {
    this.router.navigate(['/cartpage', id]);
  }

  // Define the onCardHover method to handle hover events
  onCardHover(isHovering: boolean) {
    // Add your logic here, such as changing styles or updating state
    if (isHovering) {
      // Handle hover in
      console.log('Card hovered');
    } else {
      // Handle hover out
      console.log('Card Un hovered');
    }
  }
}
