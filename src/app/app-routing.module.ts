import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RestaurantItemsComponent } from './components/restaurant-items/restaurant-items.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SelectFoodComponent } from './components/select-food/select-food.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'food-category', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path:'', component: LayoutComponent,
    children: [
      {
        path:'food-category', component: CategoriesComponent
      },
      {
        path:'restaurant-items/:categoryName', component: RestaurantItemsComponent
      },
      {
        path:'select-items/:restaurantId/:categoryId', component: SelectFoodComponent
      },
      {
        path: 'create-order', component: CreateOrderComponent
      }
    ]
  },
  {
    path: '**', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
