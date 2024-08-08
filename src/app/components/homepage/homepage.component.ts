import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductserviceService } from '../../services/productservice.service'; // Adjust path as needed
import { Product } from '../../models/products';
import { Router } from '@angular/router';
import { DrawerpageComponent } from './drawerpage/drawerpage.component'; // Correct the import

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];

  @ViewChild(DrawerpageComponent) drawerPageComponent!: DrawerpageComponent;

  constructor(
    private productService: ProductserviceService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }

  viewProduct(id: number): void {
    this.router.navigate(['/productpage', id]); // Use the Router to navigate
  }

  addtoCart(id: number): void {
    this.router.navigate(['/cartpage', id]);
  }

  onCardHover(isHovering: boolean) {
    if (isHovering) {
      console.log('Card hovered');
    } else {
      console.log('Card Un hovered');
    }
  }

  toggleDrawer() {
    if (this.drawerPageComponent) {
      if (this.drawerPageComponent.isDrawerOpen) {
        this.drawerPageComponent.closeDrawer();
      } else {
        this.drawerPageComponent.openDrawer();
      }
    } else {
      console.error('DrawerPageComponent not found!');
    }
  }
}
