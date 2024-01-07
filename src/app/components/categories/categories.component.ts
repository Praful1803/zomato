import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  foodItems: any[] = [];

  constructor(private master: MasterService, private loader: NgxUiLoaderService, private router: Router){ }

  ngOnInit(): void {
    this.loader.start();
    this.getFoodCategory();
  }
  getFoodCategory(){
    this.master.getAllFoodCategories().subscribe((res: any) => {
      console.log('data', res);
      if(res.result){
        this.foodItems = res.data;
        this.loader.stop();
      }
    });
  }
  navigate(id: number){
    this.router.navigate(['/restaurant-items/',id]);
  }
}
