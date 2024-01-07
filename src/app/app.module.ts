import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RestaurantItemsComponent } from './components/restaurant-items/restaurant-items.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LayoutComponent } from './components/layout/layout.component';
import { SelectFoodComponent } from './components/select-food/select-food.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriesComponent,
    RestaurantItemsComponent,
    CreateOrderComponent,
    LayoutComponent,
    SelectFoodComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
