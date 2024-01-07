import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getAllFoodCategories(){
    return this.http.get('https://freeapi.miniprojectideas.com/api/zomato/GetAllFoodCategory');
  }

  getFoodCategoryById(id: number){
    return this.http.get('https://freeapi.miniprojectideas.com/api/zomato/GetRestaurantServingByCategoryId?categoryId=' + id);
  }

  login(obj: any){
    return this.http.post('https://freeapi.miniprojectideas.com/api/zomato/Login', obj);
  }

  getRestaurantByRestaurantId(id: number){
    return this.http.get('https://freeapi.miniprojectideas.com/api/zomato/GetRestaurantByRestaurantId?restaurantID=' + id);
  }
  
  getFoodItemOfRestaurantByCategory(restId: number, CatId: number){
    return this.http.get(`https://freeapi.miniprojectideas.com/api/zomato/GetFoodItemOfRestaurantByCategory?restaurantId=${restId}&categoryId=${CatId}`);
  }

  getAllCartItemsByCustomerId(custId: number, restId: number){
    return this.http.get(`https://freeapi.miniprojectideas.com/api/zomato/GetCartItemsByCustomerIdForRestaurant?customerId=${custId}&restaurantId=${restId}`);
  }

  addToCart(obj: any){
    return this.http.post('https://freeapi.miniprojectideas.com/api/zomato/AddToCart', obj);
  }

  updateCartQuantity(obj: any){
    return this.http.post('https://freeapi.miniprojectideas.com/api/zomato/UpdateCartQuantity', obj)
  }

  addNewOrder(obj: any){
    return this.http.post('https://freeapi.miniprojectideas.com/api/zomato/AddNewOrder', obj);
  }
}
