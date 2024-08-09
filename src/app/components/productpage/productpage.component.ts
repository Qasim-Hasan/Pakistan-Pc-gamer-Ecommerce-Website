import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../../services/productservice.service'; // Adjust path as needed
import { Product } from '../../models/products'; // Adjust path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css'],
})
export class ProductpageComponent implements OnInit {
  selectedProduct?: Product;
  cartItem: Product[] = [];

  constructor(
    private productService: ProductserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  // We got an id of an product we store it in selectedproduct and display it
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductId(id).subscribe(
      (product: Product) => {
        // Assuming getProductId returns an array of products, but we take the first one
        this.selectedProduct = product; // Assuming you expect only one product per ID
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  viewHomePage(): void {
    this.router.navigate(['/homepage']); // Use the Router to navigate
  }
}
