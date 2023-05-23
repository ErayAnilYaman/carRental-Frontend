import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import ResponseModel from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  
  apiUrl = "https://localhost:44318/api/customers/"
  constructor(private httpClient:HttpClient) { }
  getCustomers():Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }
  getCustomersById(id:number):Observable<SingleResponseModel<Customer>>{
    let path = this.apiUrl + "getcustomerbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<Customer>>(path)
  }
  getCustomerByUserId(id:number):Observable<ListResponseModel<Customer>>{
    let path = this.apiUrl + "getcustomersbyuserid?id=" + id;
    return this.httpClient.get<ListResponseModel<Customer>>(path);
  }
  add(customer:Customer):Observable<ResponseModel>{
    let path = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(path,customer);
  }
  update(customer:Customer):Observable<ResponseModel>{
    let path = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(path,customer);
  }
  delete(customer:Customer):Observable<ResponseModel>{
    let path = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(path,customer);
  }


}
