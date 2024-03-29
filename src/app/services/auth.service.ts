import { UserToRegister } from './../models/userToRegister';
import { LoginComponent } from './../components/login/login.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Token } from '@angular/compiler';
import TokenModel from '../models/tokenModel';
import { UserToLogin } from '../models/userToLogin';
import { User } from '../models/user';
import ResponseModel from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:7101/api/auth/"
  constructor(private httpClient:HttpClient) { }


  login(userToLogin:UserToLogin):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login",userToLogin);
  }
  
  register(userToRegister:UserToRegister):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",userToRegister);
  }
  isAuthentic():boolean{
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }
  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("User");
  }
}
