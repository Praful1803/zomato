import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-select-food',
  templateUrl: './select-food.component.html',
  styleUrls: ['./select-food.component.scss']
})
export class SelectFoodComponent implements OnInit{

  
  restaurantId!: number;
  
  categoryId!: number;

  customerId!: number;
  
  restaurantInfo: any;

  foodItems: any[] = [];

  cartItems: any[] = [];

  totalAmount: number = 0;

  address: string = '';

  constructor(private master: MasterService, private activeRoute: ActivatedRoute, private router: Router, private loader: NgxUiLoaderService){
    this.activeRoute.params.subscribe((res: any) => {
      this.restaurantId = +res['restaurantId'];
      this.categoryId = +res['categoryId'];
      this.getRestaurantByRestaurantId();
    })

    const loggedData = localStorage.getItem('zomatoUser');
    if(loggedData != null){
      const data = JSON.parse(loggedData);
      this.customerId = data.userId;
    }
  }
  
  ngOnInit(): void {
    this.loader.start();
    this.getFood();
    this.getAllCartItemsByCustomerId();
  }

  getRestaurantByRestaurantId(){
    this.master.getRestaurantByRestaurantId(this.restaurantId).subscribe((res: any) => {
      this.restaurantInfo = res.data;
      this.loader.stop();
    });
  }

  getFood(){
    this.master.getFoodItemOfRestaurantByCategory(this.restaurantId, this.categoryId).subscribe((res: any) => {
      this.foodItems = res.data;
      this.loader.stop();
    })
  }

  getAllCartItemsByCustomerId(){
    this.master.getAllCartItemsByCustomerId(this.customerId, this.restaurantId).subscribe((res: any) => {
      this.cartItems = this.modify_data(res);
      this.loader.stop();
      this.totalAmount = res.data.reduce((acc: any, item: any) => {
        return acc + (item.price * item.quantity);
      }, 0);
    })
  }

  modify_data(res: any){
    let arr: any = [];
    res.data.map((data: any) => {
      const modified_obj = {
        ...data,
        'addedDate': new Date(data?.addedDate)
      }
      arr.push(modified_obj);
    })
    return arr;
  }

  addToCart(food: any){
    if(this.customerId != undefined){
      const obj = {
        "customerId": this.customerId,
        "itemId": food.itemID,
        "quantity": 1
      }
      this.master.addToCart(obj).subscribe((res: any) => {
        if(res.result){
          alert(res.message);
          this.getAllCartItemsByCustomerId();
        }else {
          alert(res.message);
        }
      })
    } else {
      this.router.navigateByUrl('login');
    }
  }

  increaseQuantity(item: any){
    let plusOne = item.quantity + 1;
    let obj = {
      "customerId": this.customerId,
      "itemId": item.itemID,
      "quantity": plusOne
    }
    this.master.updateCartQuantity(obj).subscribe((res: any) => {
      if(res.result){
        this.getAllCartItemsByCustomerId();
        alert(res.message);
      } else {
        alert(res.message);
      }
    })
  }

  decreaseQuantity(item: any){
    let minusOne = item.quantity - 1;
    let obj = {
      "customerId": this.customerId,
      "itemId": item.itemID,
      "quantity": minusOne
    }
    this.master.updateCartQuantity(obj).subscribe((res: any) => {
      if(res.result){
        this.getAllCartItemsByCustomerId();
        alert(res.message);
      } else {
        alert(res.message);
      }
    })
  }

  placeOrdr(){
    if(this.address.length<3 || this.address == ''){
      alert('Please Provide Valid Address');
    } else {
      let newObj = {
        "userId": this.customerId,
        "totalAmount": this.totalAmount,
        "restaurantId": this.restaurantId,
        "deliveryAddress": this.address
      }
      this.master.addNewOrder(newObj).subscribe((res: any) => {
        if(res.result){
          alert('Order Placed');
          this.getAllCartItemsByCustomerId();
        } else {
          alert(res.message);
        }
      })
    }
  }
}
