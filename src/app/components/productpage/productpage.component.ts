import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../../services/productservice.service'; // Adjust path as needed
import { Product } from '../../models/products'; // Adjust path as needed

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
    private route: ActivatedRoute
  ) {}
  // We got an id of an product we store it in selectedproduct and display it
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedProduct = this.productService.getProductById(id);
  }
}
