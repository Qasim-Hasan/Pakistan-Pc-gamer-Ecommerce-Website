import { Component } from '@angular/core';

@Component({
  selector: 'app-drawerpage',
  templateUrl: './drawerpage.component.html',
  styleUrls: ['./drawerpage.component.css']
})
export class DrawerpageComponent {
  isDrawerOpen = false;

  openDrawer() {
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }
}
