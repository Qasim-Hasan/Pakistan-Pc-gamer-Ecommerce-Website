import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderpageComponent } from './components/headerpage/headerpage.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterpageComponent } from './components/footerpage/footerpage.component';
import { ProductpageComponent } from './components/productpage/productpage.component';
import { CartpageComponent } from './components/cartpage/cartpage.component';
import { DrawerpageComponent } from './components/homepage/drawerpage/drawerpage.component';
import { HometitleComponent } from './components/homepage/hometitle/hometitle.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Redirect to homepage by default
  { path: 'headerpage', component: HeaderpageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'footerpage', component: FooterpageComponent },
  { path: 'productpage', component: ProductpageComponent },
  { path: 'cartpage', component: CartpageComponent },
  { path: 'drawerpage', component: DrawerpageComponent },
  { path: 'hometitle', component: HometitleComponent },
  { path: 'productpage/:id', component: ProductpageComponent },
  { path: 'cartpage/:id', component: CartpageComponent },
  { path: '**', redirectTo: '/homepage', pathMatch: 'full' }, // Redirect unmatched paths to homepage
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
