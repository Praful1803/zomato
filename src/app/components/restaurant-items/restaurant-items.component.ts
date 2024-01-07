import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-restaurant-items',
  templateUrl: './restaurant-items.component.html',
  styleUrls: ['./restaurant-items.component.scss']
})
export class RestaurantItemsComponent implements OnInit {

  items: any[] = [];

  constructor(private activate: ActivatedRoute, private master: MasterService, private loader: NgxUiLoaderService, private router: Router){
    this.activate.params.subscribe((res: any) => {
      this.loadFoodItemsByCategoryId(+res['categoryName']);
    })
  }

  ngOnInit(): void {
    this.loader.start();
  }

  loadFoodItemsByCategoryId(id: number){
    this.master.getFoodCategoryById(id).subscribe((res: any) => {
      this.items = res.data;
      this.loader.stop();
    })
  }

  navigate(item: any){
    this.router.navigate(['/select-items',item.restaurantID, item.categoryId]);
  }
}
