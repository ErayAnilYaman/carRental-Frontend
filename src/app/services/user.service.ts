import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  apiUrl = "https://localhost:44318/api/users/"
  constructor(private httpClient:HttpClient) { }
  getUserByCarId(carId:number):Observable<ListResponseModel<User>>{
    let getUserByCarIdPath = this.apiUrl + "getuserbycarid?id=" + carId
    return this.httpClient.get<ListResponseModel<User>>(getUserByCarIdPath);
  }

}
