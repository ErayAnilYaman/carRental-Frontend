import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';
import { Observable, ObservableNotification } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Profile } from '../models/profile';
import ResponseModel from '../models/responseModel';
import { UserForUpdate } from '../models/userForUpdate';
import { UserForPasswordUpdate } from '../models/userForPasswordUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  apiUrl = "https://localhost:7101/api/users/"
  constructor(private httpClient:HttpClient) { }
  getUserByCarId(carId:number):Observable<ListResponseModel<User>>{
    let getUserByCarIdPath = this.apiUrl + "getuserbycarid?id=" + carId
    return this.httpClient.get<ListResponseModel<User>>(getUserByCarIdPath);
  }
  getUserByMail(mail:string):Observable<ListResponseModel<User>>{
    let getUserPath = this.apiUrl + "getuserbymail?mail=" + mail;
    return this.httpClient.get<ListResponseModel<User>>(getUserPath);
  }
  getUserByUserName(userName:string):Observable<SingleResponseModel<User>>{
    let path = this.apiUrl + "getuserbyusername?name=" + userName;
    return this.httpClient.get<SingleResponseModel<User>>(path);
  }
  listUsers():Observable<ListResponseModel<User>>{
    let path = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<User>>(path);
  }
  getUserById(id:number):Observable<SingleResponseModel<User>>{
    let path = this.apiUrl + "getuserbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<User>>(path);
  }
  getUserDetailsById(id:number):Observable<ListResponseModel<Profile>>{
    let path = this.apiUrl + "getuserdetailsbyid?id=" + id;
    return this.httpClient.get<ListResponseModel<Profile>>(path);
  }
  getUserDetailsByCustomerId(id:number):Observable<ListResponseModel<Profile>>{
    let path = this.apiUrl + "getuserdetailsbycustomerid?id=" + id;
    return this.httpClient.get<ListResponseModel<Profile>>(path);
  }
  delete(user:User):Observable<ResponseModel>{
    let path = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(path,user);
  }
  deleteById(id:number):Observable<ResponseModel>{
    let path = this.apiUrl + "deletebyid?id=" + id;
    return this.httpClient.post<ResponseModel>(path,id);
  }
  update(userForUpdate:UserForUpdate):Observable<ResponseModel>{
    let path = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(path,userForUpdate);
  }
  updatePassword(userForPasswordUpdate:UserForPasswordUpdate):Observable<ResponseModel>{
    let path = this.apiUrl + "updatePassword";
    return this.httpClient.post<ResponseModel>(path,userForPasswordUpdate);
  }
}
