import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  
  result:boolean;
  title:string = "RentACar"
  brand:string = "TouchRent"
  filterText = ""
  userName:string
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.IsAuthentic();
    if (localStorage.getItem("Authorization")) {
      this.IsAuthentic();
      this.result = true;
    }
    if (this.result === true) {
      this.userName = localStorage.getItem("userName");
    }
    
  }

  IsAuthentic(){
    if (this.authService.isAuthentic()) {
      this.result = true;
    }
    else{
      this.result = false;
    }
  }
  directLogin(){
    this.router.navigateByUrl("/login")
  }
  directRegister(){
    this.router.navigateByUrl("/register");
  }
  logOut(){
    this.authService.logOut();
  }

}
