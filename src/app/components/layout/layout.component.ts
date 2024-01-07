import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{

  loggedObj: any = {};

  constructor(){
    const localData = localStorage.getItem('zomatoUser');
    if(localData != null){
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
      console.log('obj data', this.loggedObj);
    }
  }

  ngOnInit(): void {

  }

  logout(){
    localStorage.removeItem('zomatouser');
    localStorage.clear();
    this.loggedObj = {};
  }


}
