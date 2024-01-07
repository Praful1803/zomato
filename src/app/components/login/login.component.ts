import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginObj: any = {
    "userName": "",
    "password": ""
  };

  constructor(private master: MasterService, private router: Router){  }

  login(){
    this.master.login(this.loginObj).subscribe((res: any) => {
      if(res.result){
        localStorage.setItem('zomatoUser', JSON.stringify(res.data));
        this.router.navigateByUrl('/food-category');
      } else {
        alert(res.message);
      }
    })
  }
}
