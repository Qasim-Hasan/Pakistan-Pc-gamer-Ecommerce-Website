import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from '../../services/productservice.service'; // Adjust path as needed
import { Product } from '../../models/products'; // Adjust path as needed

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css'],
})
export class ProductpageComponent implements OnInit {
  selectedProduct?: Product;

  constructor(
    private productService: ProductserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductId(id).subscribe(
      (product: Product) => {
        this.selectedProduct = product; // Single product expected
      },
      (error) => {
        console.error('Error fetching product:', error);
        // Optional: Add user feedback for error
      }
    );
  }

  viewHomePage(): void {
    this.router.navigate(['/homepage']); // Navigate to homepage
  }

  addtoCart(id: number): void {
    this.router.navigate(['/cartpage', id]);
  }

}
