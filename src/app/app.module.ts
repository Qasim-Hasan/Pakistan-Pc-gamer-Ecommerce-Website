import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductpageComponent } from './components/productpage/productpage.component';
import { CartpageComponent } from './components/cartpage/cartpage.component';
import { HeaderpageComponent } from './components/headerpage/headerpage.component';
import { FooterpageComponent } from './components/footerpage/footerpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductpageComponent,
    CartpageComponent,
    HeaderpageComponent,
    FooterpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
