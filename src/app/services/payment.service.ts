import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Pay } from '../models/pay';
import ResponseModel from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService  {
  apiUrl = "https://localhost:44318/api/payment/"
  constructor(private httpClient:HttpClient) { }

  add(payment:Pay):Observable<ResponseModel>{
    let addPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(addPath,payment)
  }
  listByUserId(userId:number):Observable<ListResponseModel<Pay>>{
    let listPath = this.apiUrl + "getbyuserid?id=" + userId;
    return this.httpClient.get<ListResponseModel<Pay>>(listPath);
  }
}
