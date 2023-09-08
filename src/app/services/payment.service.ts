import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Pay } from '../models/pay';
import ResponseModel from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService  {
  apiUrl = "https://localhost:7101/api/payment/"
  constructor(private httpClient:HttpClient) { }

  add(payment:Pay):Observable<ResponseModel>{
    let addPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(addPath,payment)
  }
  listByUserId(userId:number):Observable<ListResponseModel<Pay>>{
    let listPath = this.apiUrl + "getbyuserid?id=" + userId;
    return this.httpClient.get<ListResponseModel<Pay>>(listPath);
  }
  getPayById(id:number):Observable<SingleResponseModel<Pay>>{
    let path = this.apiUrl + "getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Pay>>(path);
  }
  delete(id:number):Observable<ResponseModel>{
    let path = this.apiUrl + "deletebyid?id=" + id;
    return this.httpClient.post<ResponseModel>(path,id);
  }
  update(pay:Pay):Observable<ResponseModel>{
    let path = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(path,pay);
  }
}
